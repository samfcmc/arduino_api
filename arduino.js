/*
 * Arduino module
 */

var Serial = require('serialport');
var SerialPort = Serial.SerialPort;

var settings = { baudRate: 9600,
				dataBits: 8,
				parity: 'none', 
				stopBits: 1,
				flowControl: false,
				  };

var deviceName = 'arduino';

var port;

var receiveDataFunction = function(data) {
	console.log('Default receive data function ' + data);
};

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
 					console.log('Port is opened');
 					sp.on('data', function(data) {
 						receiveDataFunction(data);
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

 Arduino.prototype.sendData = function(data, receiveDataF) {
 	receiveDataFunction = receiveDataF;

 	port.write(data, function(error, results) {
 		if(error) {
 			console.log('Error: ' + error);
 		}
 		console.log('Results: ' + results);
 	})
 };

 Arduino.prototype.setReceiveDataHandler = function(handler) {
 	port.on('data', function(data) {
 		handler(data);
 	});
 };

 Arduino.prototype.changeLedState = function(led, responseFunction) {
 	var command = 'LED-' + led;

 	var handler = function(data) {
 		console.log('Another handler ' + data);
 	}

 	port.write(command, function(error, results) {
 		console.log(error);
 		console.log(results);
 	});

 };

 Arduino.prototype.getLedsStates = function() {
 	var command = 'LED-STAT';

 	port.write(command, function(error, results) {
 		console.log(error);
 		console.log(results);
 		console.log('Led state');
 	});
 };

module.exports = Arduino;

//var arduino = new Arduino();
//arduino.connect();