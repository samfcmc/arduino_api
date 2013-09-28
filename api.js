var Express = require('express');
var Arduino = require('./arduino.js');

var app = Express();
var arduino = new Arduino();

arduino.connect();

app.get('/', function(request, response) {
	if(apiResponse()) {
		response.type('text/plain');
		response.send('OK');
	}
	
});

app.get('/led/:id', function(request, response) {
	arduino.changeLedState(request.params.id);
	sendJsonResponse(response, {led : {state : 'test'}});	
});

function apiResponse() {
	console.log('API response to get request')
	return true;
}

function sendJsonResponse(response, json) {
	response.type('application/json');

	//To deal with anoying chrome error
	//Not sure if it's the best solution or not
	response.setHeader('Access-Control-Allow-Origin', '*');
	response.send(json);
}

module.exports = app;