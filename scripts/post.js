'use strict';

// Initialize
var argv = require('minimist')(process.argv.slice(2));
var PostBot = require(__dirname + '/../models/post-bot');
var postBot = new PostBot();

if (argv._ == null || argv._.length == 0) throw 'mode was not specified';

// Parse the arguments
var mode = argv._[0], options = {};
for (var key in argv) {
	if (key != '_') options[key] = argv[key];
}

// Check the options
if (options['enable-days']) {
	var days_of_week = options['enable-days'].toString().split(',');
	var day = new Date().getDay().toString();
	if (days_of_week.indexOf(day) == -1) {
		console.log('Canceled. Today is not specified day.');
		return process.exit(0);
	}
}
if (options['weekday-only']) {
	var day = new Date().getDay();
	if (day == 0 || day == 6) { // Sunday or Saturday
		console.log('Canceled. Today is not weekday.');
		return process.exit(0);
	}
}

// Check the mode
if (mode.match(/^postWorkTimeSummary(.+)$/)) {
	console.log('Executing ' + mode + '...');
	postBot.postWorkTimeSummary(RegExp.$1.toLowerCase(), options);
} else {
	throw 'Unknown mode';
}

console.log('Done');
