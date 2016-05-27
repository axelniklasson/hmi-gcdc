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
    speed: 6.19,
    acceleration: -0.033,
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
        x: -2000,
        y: -5000,
        width: 1700,
        length: 4500
    },
    {
        flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ID: 2,
        speed: 18.88,
        acceleration: 0.8,
        heading: 90,
        x: 3000,
        y: 5000,
        width: 1700,
        length: 4500
    }
];

data.ego = ego;
data.vehicles = vehicles;
var counter = 0;

setInterval(function() {

    var random = Math.floor(Math.random() * 20) + 1;
    if (random > 10) {
        data.vehicles[0].x += 120;
        data.vehicles[1].x -= 40;
    } else {
        data.vehicles[0].x -= 30;
        data.vehicles[1].x += 60;
    }
    
    if (counter > 30 && counter < 60) {
        data.ego.flags[1] = 1;
    } else {
        data.ego.flags[1] = 0;
    }

    if (counter > 90 && counter < 120) {
        data.ego.flags[2] = 1;
    } else {
        data.ego.flags[2] = 0;
    }

    if (counter > 150 && counter < 180) {
        if (data.ego.acceleration > -0.5) {
            data.ego.acceleration = -0.5;
        }
        data.ego.acceleration -= (random * 0.001);
        data.ego.speed -= (random * 0.001);
        data.ego.flags[0] = 1;
    } else {
        data.ego.acceleration += (random * 0.001);
        data.ego.speed += (random * 0.001);
        data.ego.flags[0] = 0;
    }

    counter++;
    io.emit('vehicleData', data);
}, 100);
