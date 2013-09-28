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

var port = undefined;

function Arduino() {
}

/*
 * connect: Try to find the arduino in any serial port and open it
 */

 Arduino.prototype.connect = function() {
 	var sp;
 	Serial.list(function(error, ports) {
 		ports.forEach(function(port) {
 			if(port.pnpId.indexOf(deviceName) !== -1) {
 				console.log('Arduino found on port ' + port.comName);
 				sp = new SerialPort(port.comName, settings);
 				sp.on('open', function() {
 					console.log('Port open');

 					sp.on('data', function(data) {
 						console.log('Data received ' + data.toString());
 					});
 				});
 				return;
 			}
 		});

 		port = sp;

 		if(port === undefined) {
 			console.log('Cannot find arduino');
 		}
 	});
 };

 Arduino.prototype.changeLedState = function(led) {
 	var command = 'LED-' + led;
 	port.write(command, function(error, results) {
 		console.log(error);
 		console.log(results);
 	});
 }

module.exports = Arduino;

//var arduino = new Arduino();
//arduino.connect();