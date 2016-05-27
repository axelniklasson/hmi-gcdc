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
    speed: 16.7,
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
        x: -13000,
        y: 5500,
        width: 1700,
        length: 4500
    },
    {
        flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ID: 100,
        speed: 18.88,
        acceleration: 0.8,
        heading: 90,
        x: -6000,
        y: 4500,
        width: 3500,
        length: 8000
    }
];
18,055555556
22,222222222
data.ego = ego;
data.vehicles = vehicles;
var counter = 0;

setInterval(function() {

    if (counter < 30) {

    } else if (counter >= 30 && counter < 60) {
        ego.acceleration += 0.1;
        ego.speed += 0.1;
        vehicles[0].x += 200;
        vehicles[1].x += 200;
    } else if (counter >= 60 && counter < 90) {
        ego.speed += 0.1;
        vehicles[0].x += 300;
        vehicles[1].x += 300;
    } else if (counter >= 90 && counter < 120) {
        ego.acceleration -= 0.1;
        ego.speed -= 0.05;
        vehicles[0].x += 250;
        vehicles[1].x += 250;
    }
    ego.flags[0] = 0;

    counter++;
    io.emit('vehicleData', data);
}, 100);
