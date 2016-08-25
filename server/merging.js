const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var binary = require('binary');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000);

// Test suite
var startX = 1000;
var startY = 2000;
var data = {};
var ego = {
    flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    ID: 170,
    speed: 20,
    acceleration: 0,
    heading: 90,
    x: 682276.32,
    y: 5705847.19,
    width: 1.865,
    length: 4.628,
    distanceToLaneC: 0,
    roadWidth: 5
};
var vehicles = [
    {
        flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ID: 1,
        speed: 18.88,
        acceleration: 0.8,
        heading: 90,
        x: -12000,
        y: 0,
        width: 1700,
        length: 4500
    },
    {
        flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ID: 100,
        speed: 18.88,
        acceleration: 0.8,
        heading: 90,
        x: -8000,
        y: 4500,
        width: 3500,
        length: 8000
    }
];

data.ego = ego;
data.vehicles = vehicles;
var counter = 0;

setInterval(function() {

    var random = Math.floor(Math.random() * 20) + 1;
    if (counter < 50) {
        ego.flags[5] = 1;
        ego.flags[6] = 1;
    } else if (counter >= 50 && counter < 80) {
        ego.distanceToLaneC += 83.333333333;
        ego.flags[7] = 1;
        ego.flags[6] = 0;
        ego.flags[2] = 1;
        vehicles[0].y -= 83.333333333;
        vehicles[1].y -= 83.333333333;
    } else if (counter >= 80 && counter < 110) {
        if (counter == 80) {
            ego.distanceToLaneC = -ego.distanceToLaneC;
        } else {
            ego.distanceToLaneC += 83.333333333;
        }
        vehicles[0].y -= 83.333333333;
        ego.flags[2] = 1;
        vehicles[1].y -= 83.333333333;
    } else {
        ego.flags[2] = 0;
        ego.flags[7] = 0;
        ego.flags[5] = 0;
    }
    vehicles[0].x -= 50;
    vehicles[1].x -= 20;

    counter++;
    io.emit('vehicleData', data);
}, 100);
