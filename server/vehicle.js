const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var binary = require('binary');
var parsing = require('./parsing/module.js');

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

server.on('message', (packet, remote) => {
    var data = parsing.parse(packet);
    io.emit('vehicleData', data); 
});

server.bind(41234);
