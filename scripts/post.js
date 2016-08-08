'use strict';

// Initialize
var PostBot = require(__dirname + '/../models/post-bot');
var postBot = new PostBot();

console.log(postBot);

// Parse the arguments
process.argv.forEach(function (arg, index) {

	if (index <= 1) return;

	if (arg == 'postWorkTimeSummaryMonthly') {
	   console.log('Executing postWorkTimeSummaryMonthly');
	   postBot.postWorkTimeSummary('monthly');
	} if (arg == 'postWorkTimeSummaryWeekly') {
		console.log('Executing postWorkTimeSummaryWeekly');
		postBot.postWorkTimeSummary('weekly');
	} else if (arg == 'postWorkTimeSummaryDaily') {
		console.log('Executing postWorkTimeSummaryDaily');
		postBot.postWorkTimeSummary('daily');
	}

});

console.log('Done');
