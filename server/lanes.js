const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var binary = require('binary');
var parsing = require('./parsing/module.js');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000);

var data = [];
data.ego = { "flags": 29127,
    "ID": 199,
    "speed": 23.457,
    "acceleration": 1.987,
    "heading": 2.345,
    "x": 6666.555,
    "y": 5555.666,
    "width": 1.865,
    "length": 4.628,
    "distanceToLaneC": 0,
    "roadWidth": 5,
    "competitionDist": 0 };

data.vehicles = [];
data.vehicles[0] = { "flags": 29127,
      "ID": 101,
      "speed": 11.222,
      "acceleration": 0,
      "heading": 0,
      "x": -3333.333,
      "y": 3333.111,
      "width": 2,
      "length": 4.2 };
data.vehicles[1] = { "flags": 29127,
      "ID": 202,
      "speed": 33.123,
      "acceleration": 0,
      "heading": 0,
      "x": -6666.555,
      "y": -0.555000000000291,
      "width": 6,
      "length": 10.1 };


var increment = true;
setInterval(function() {
    if (increment) {
        data.ego.distanceToLaneC += 70;
    } else {
        data.ego.distanceToLaneC -= 70;
    }

    if (data.ego.distanceToLaneC > 2000) {
        increment = false;
    } else if (data.ego.distanceToLaneC < -2000) {
        increment = true;
        data.ego.distanceToLaneC = -2000;
    }

    io.emit('vehicleData', [data.ego]);
}, 100);
