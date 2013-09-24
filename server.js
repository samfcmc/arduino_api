var Serial = require('serialport');
var SerialPort = Serial.SerialPort;
//var portName = '/dev/ttyACM0';
var settings = { baudRate: 9600,
				dataBits: 8,
				parity: 'none', 
				stopBits: 1,
				flowControl: false, };

var portName;
var deviceName = 'arduino';

Serial.list(function(error, ports) {
	ports.forEach(function(port) {
		console.log(port.comName);
		console.log(port.pnpId);
		if(port.pnpId.indexOf(deviceName) !== -1) {
			portName = port.comName;
			console.log('Arduino found on port ' + portName);
			com();
			return;
		}
	});
	if(portName === undefined) {
		console.log('Cannot find arduino');
	}
});

function com() {
	var sp = new SerialPort(portName, settings);

	sp.on('open', function() {
		console.log('Port open');

		sp.on('data', function(data) {
			console.log('Data received ' + data.toString());
		});

		sp.write('A', function(error, results) {
			console.log("Error: " + error);
			console.log("Results " + results);
		});
	});
}

