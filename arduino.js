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
var serialPort = undefined;

function Arduino() {
}

/*
 * connect: Try to find the arduino in any serial port and open it
 */

 Arduino.prototype.connect = function() {
 	Serial.list(function(error, ports) {
 		ports.forEach(function(port) {
 			if(port.pnpId.indexOf(deviceName) !== -1) {
 				console.log('Arduino found on port ' + port.comName);
 				serialPort = new SerialPort(port.comName, settings);
 				
 				serialPort.on('open', function() {
 					console.log('Port open');

 					serialPort.on('data', function(data) {
 						console.log('Data received ' + data.toString());
 					});
 				});
 				return;
 			}
 		});
 	});

 	if(serialPort === undefined) {
 		console.log('Cannot find arduino');
 	}
 };

 Arduino.prototype.changeLedState = function(led) {
 	serialPort.write('LED' + led, function(error, results) {
 		console.log(error);
 		console.log(results);
 	});
 }

module.exports = Arduino;

//var arduino = new Arduino();
//arduino.connect();