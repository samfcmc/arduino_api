var Express = require('express');
var Arduino = require('./arduino.js');

var app = Express();
var arduino = new Arduino();

arduino.connect();

/*
 * Routes
 */

app.get('/', function(request, response) {
	if(apiResponse()) {
		response.type('text/plain');
		response.send('OK');
	}
	
});

app.get('/led/:id', function(request, response) {	
	setJSONResponseHeader(response);

	arduino.sendData('LED-' + request.params.id, function(data) {
		var received = data.toString();
		var led = {led : 
			{state : received}};

		console.log('Data received from Arduino ' + received);
		response.send(led);
	});
});

app.get('/leds', function(request, response) {
	arduino.getLedsStates();
	sendJsonResponse(response, {leds : {msg : 'test'}});
});

/*
 * Useful functions to use inside routes
 */
function sendJsonResponse(response, json) {
	//To deal with anoying chrome error
	//Not sure if it's the best solution or not
	

	
	response.send(json);
}

function setJSONResponseHeader(response) {
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.type('application/json');
}

function removeEndOfLine(string) {
	//Receives answear from arduino like "something\r\n"
	var s = string.substring(0, string.length - 2);
	return s;
}

module.exports = app;