/**
 * slackbot-jobcan-work-time
 * https://github.com/denlabo/slackbot-jobcan-work-time
 * (C) 2016 - denLabo LLC. Released under MIT License.
 */

'use strict';

var express = require('express');
var app = express();

// Routes
app.get('/', function (req, res) {
	res.send('Please see <a href="https://github.com/denlabo/slackbot-jobcan-work-time/README.md">document</a>.');
});

// Start the server
var s = app.listen(process.env.PORT || 3000, function () {
	var host = s.address().address;
	var port = s.address().port;
	console.log('The app listening on port %s:%s', host, port);
});
