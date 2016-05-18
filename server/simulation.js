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
    flags: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
    ID: 170,
    speed: 6.19,
    acceleration: 3,
    heading: 3.127,
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
        heading: 1.583,
        x: startX - 1000,
        y: startY,
        width: 1700,
        length: 4500
    },
    {
        flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ID: 2,
        speed: 18.88,
        acceleration: 0.8,
        heading: 90,
        x: startX,
        y: startY + 1000,
        width: 1700,
        length: 4500
    },
    {
        flags: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ],
        ID: 3,
        speed: 18.88,
        acceleration: 0.8,
        heading: -90,
        x: startX,
        y: startY,
        width: 1700,
        length: 4500
    }
];

data.ego = ego;
data.vehicles = vehicles;

setInterval(function() {
    data.vehicles[0].x += 60;
    data.vehicles[0].y -= 270;
    data.vehicles[1].x += 270;
    data.vehicles[1].y -= 60;
    data.vehicles[2].x -= 270;
    data.vehicles[2].y -= 60;
    // console.log(data);
    io.emit('vehicleData', data);
}, 100);
