/*var Arduino = require('./arduino.js');

var arduino = new Arduino();

arduino.connect();*/

var App = require('./api.js');
var port = 8000;

App.listen(port, function() {
	console.log('Listening on port ' + port);
});
