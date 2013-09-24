/*
 * Arduino module
 */

var Serial = require('serialport');
var SerialPort = Serial.SerialPort;
//var portName = '/dev/ttyACM0';
var settings = { baudRate: 9600,
				dataBits: 8,
				parity: 'none', 
				stopBits: 1,
				flowControl: false, };

var deviceName = 'arduino';

function Arduino() {
	
}

/*
 * connect: Try to find the arduino in any serial port and open it
 */

Arduino.prototype.connect = function() {
	this.serialport = undefined;
	Serial.list(function(error, ports) {
		ports.forEach(function(port) {
			if(port.pnpId.indexOf(deviceName) !== -1) {
				console.log('Arduino found on port ' + portName);
				this.serialPort = new SerialPort(port.comName, settings);
				return;
			}
		});
		if(this.serialPort === undefined) {
			console.log('Cannot found arduino');
		}
	});
};

Arduino.prototype.init = function() {
	this.serialPort.on('open', function() {
		console.log('Port open');

		this.serialPort.on('data', function(data) {
			console.log('Data received ' + data.toString());
		});
	});
};

module.exports = Arduino;

//var arduino = new Arduino();
//arduino.connect();