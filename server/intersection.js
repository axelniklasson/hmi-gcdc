const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var binary = require('binary');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000);

const LABELS = [
    'steeringAngle',
    'throttlePedalPosition',
    'gearStatus',
    'turnIndicator',
    'driverBreaking',
    'driverBelted',
    'heading',
    'speed',
    'longAcc',
    'latVel',
    'yawRate',
    'x',
    'y'
];

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});


var counter = 0;

server.on('message', (packet, remote) => {

    if (counter % 7 == 0) {
        var data = parse(packet);
        console.log(data);
        io.emit('intersectionData', data); 
    }

    counter++;
});

function parse(packet) {
    var uInts = [];
    var resultArr = [{}, {}, {}];
    var egoVehicle = {};

    var index = 0;
    for (var value of packet.values()) {
        uInts[index] = value;
        index += 1;
    }

    index = 0;
    for (var i = 0; i < (packet.length / 8); i++) {
        var binary = [];
        for (var j = 0 + (8 * i); j < 8 + (8 * i); j++) {
            var currentNumber = uInts[j];
            var count = 0;

            while (currentNumber > 0) {
                var bit = currentNumber % 2;
                var quotient = Math.trunc(currentNumber / 2);
                binary.unshift(bit);
                currentNumber = quotient;
                count += 1;
            }

            while (count < 8) {
                binary.unshift(0);
                count++;
            }
        }

        var exponent = 0;
        for (var e = 0, k = 11; k > 0; k--, e++) {
            exponent = exponent + binary[k] * (Math.pow(2, e));
        }
        exponent = exponent-1023;

        var mantissa = 0;
        for (var e = -1, k = 12; k < 64; k++, e--){
            mantissa = mantissa + binary[k] * (Math.pow(2, e));
        }

        var decimal = (1 + mantissa) * Math.pow(2, exponent);

        if (binary[0] === 1){
            decimal = -decimal;
        }

        var vehicleIndex = parseInt(index/13);
        if (parseInt(index / 13) == 0) {
            resultArr[vehicleIndex][LABELS[index % 13]] = decimal;
        } else {
            switch(index % 13) {
                
                // calculate relative x coordinate
                case 11:
                    resultArr[vehicleIndex][LABELS[index % 13]] = (decimal - resultArr[0].x) * 1000;
                    break;

                // calculate relative y coordinate
                case 12:
                    resultArr[vehicleIndex][LABELS[index % 13]] = (-decimal + resultArr[0].y) * 1000;
                    break;

                // no calculations needed
                default:
                    resultArr[vehicleIndex][LABELS[index % 13]] = decimal
                    break;
            }
        }
        index++;
    }

   return resultArr;
}

server.bind(41234);
