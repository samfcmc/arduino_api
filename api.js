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

function apiResponse() {
	console.log('API response to get request')
	return true;
}

module.exports = app;