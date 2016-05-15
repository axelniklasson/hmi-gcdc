var labels = require('./labels.js');

module.exports = {
  parse: function(packet) {
    var data = [];

    // Extract ego data
    var flags = this.parseFlags(packet.slice(0, 2));
    var ID = this.parseUint16(packet.slice(2, 4));
    var speed = this.parseSingle(packet.slice(4, 8));
    var acceleration = this.parseSingle(packet.slice(8, 12));
    var heading = this.parseSingle(packet.slice(12, 16));
    var x = this.parseDouble(packet.slice(16, 24));
    var y = this.parseDouble(packet.slice(24, 32));
    var width = this.parseSingle(packet.slice(32, 36));
    var length = this.parseSingle(packet.slice(36, 40));
    var distanceToLane = this.parseSingle(packet.slice(40, 44));
    var roadWidth = this.parseSingle(packet.slice(44, 48));
    var competitionDist = this.parseSingle(packet.slice(48, 52));

    var ego = {};
    var egoLabels = labels.getEgoLabels();
    ego[egoLabels[0]] = flags;
    ego[egoLabels[1]] = ID;
    ego[egoLabels[2]] = speed;
    ego[egoLabels[3]] = acceleration;
    ego[egoLabels[4]] = heading;
    ego[egoLabels[5]] = x;
    ego[egoLabels[6]] = y;
    ego[egoLabels[7]] = width;
    ego[egoLabels[8]] = length;
    ego[egoLabels[9]] = distanceToLane;
    ego[egoLabels[10]] = roadWidth;
    ego[egoLabels[11]] = competitionDist;
    data.ego = ego;

    // Extract other vehicles data
    data.vehicles = [];
    var vehicleLabels = labels.getVehicleLabels();
    var vehiclesData = packet.slice(52);
    for (var i = 0; i < vehiclesData.length / 40; i++) {
        var currentVehicle = vehiclesData.slice(40*i, 40+40*i)

        var ID = this.parseUint16(currentVehicle.slice(2, 4));
        if (ID != 0) {
            var flags = this.parseFlags(currentVehicle.slice(0, 2));
            var speed = this.parseSingle(currentVehicle.slice(4, 8));
            var acceleration = this.parseSingle(currentVehicle.slice(8, 12));
            var heading = this.parseSingle(currentVehicle.slice(12, 16));
            var x = this.parseDouble(currentVehicle.slice(16, 24));
            var y = this.parseDouble(currentVehicle.slice(24, 32));
            var width = this.parseSingle(currentVehicle.slice(32, 36));
            var length = this.parseSingle(currentVehicle.slice(36, 40));

            var vehicle = {};
            vehicle[vehicleLabels[0]] = flags;
            vehicle[vehicleLabels[1]] = ID;
            vehicle[vehicleLabels[2]] = speed;
            vehicle[vehicleLabels[3]] = acceleration;
            vehicle[vehicleLabels[4]] = heading;
            vehicle[vehicleLabels[5]] = x - data.ego.x;
            vehicle[vehicleLabels[6]] = y - data.ego.y;
            vehicle[vehicleLabels[7]] = width;
            vehicle[vehicleLabels[8]] = length;
            data.vehicles[i] = vehicle;
        }
    }
    return data;
  },
  parseFlags: function(data) {
    var binary = [];
    for (var i = 0; i < data.length; i++) {
        var currentNumber = data[i];
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
    return binary.reverse();
  },
  parseUint16: function(data) {
    var binary = [];
    for (var i = 0; i < data.length; i++) {
        var currentNumber = data[i];
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
    binary.reverse();
    var result = 0;
    for (var j = 0; j < binary.length; j++) {
        result += binary[j] * Math.pow(2, j);
    }
    return result;
  },
  parseSingle: function(data) {
    var binary = [];
    for (var i = 0; i < data.length; i++) {
        var currentNumber = data[i];
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
    for (var e = 0, k = 8; k > 0; k--, e++) {
        exponent = exponent + binary[k] * (Math.pow(2, e));
    }
    exponent = exponent-127;

    var mantissa = 0;
    for (var e = -1, k = 9; k < 32; k++, e--){
        mantissa = mantissa + binary[k] * (Math.pow(2, e));
    }

    var decimal = (1 + mantissa) * Math.pow(2, exponent);

    if (binary[0] === 1){
        decimal = -decimal;
    }

    return Math.round(decimal * 1000) / 1000;
  },
  parseDouble: function(data) {
    var binary = [];
    for (var i = 0; i < data.length; i++) {
        var currentNumber = data[i];
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

    return Math.round(decimal * 1000) / 1000;
  }
};