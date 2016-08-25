const dgram = require('dgram');
const server = dgram.createSocket('udp4');
var binary = require('binary');
var parsing = require('./parsing/module.js');

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
http.listen(3000);

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (packet, remote) => {
    parsing.parse(packet, function(data) {
        console.log(data);
        io.emit('vehicleData', data); 
    });
});

server.bind(41234);
