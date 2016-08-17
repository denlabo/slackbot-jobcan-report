'use strict';

var JobCan = require('jobcan-client'),
	Slack = require('node-slack');


/**
 * Constructor
 */
var PostBot = function () {

	// Initialize the Slack bot client
	this.slack = new Slack(process.env.SLACK_WEBHOOK_URL, {});

};


/**
 * Post the work time summary to Slack
 * @param {String} period_type  Period type - 'monthly', 'weekly', 'daily', 'today'
 * @param {Object} options      Option parameters
 */
PostBot.prototype.postWorkTimeSummary = function (period_type, options) {

	var self = this;

	if (options == null) options = {};

	var jobCan = new JobCan();

	// Execute authentication
	jobCan.auth(process.env.JC_COMPANY_ID, process.env.JC_GROUP_MANAGER_ID, process.env.JC_PASSWORD, function (error, session_id) {

		if (error) throw error;

		var now = new Date(), start_date = null, end_date = null, period_text;
		if (period_type == 'today') { // Today
			start_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
			end_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
			period_text = start_date.getFullYear() + '/' + (start_date.getMonth() + 1) + start_date.getDate();
		} else if (period_type == 'daily') { // Yesterday
			start_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
			end_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1, 0, 0, 0);
			period_text = start_date.getFullYear() + '/' + (start_date.getMonth() + 1) + (start_date.getDate() - 1);
		} else if (period_type == 'weekly') { // This week
			start_date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay(), 0, 0, 0);
			end_date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
			period_text = 'From ' + start_date.getFullYear() + '/' + (start_date.getMonth() + 1) + '/' + start_date.getDate()
				+ ' To ' + (end_date.getMonth() + 1) + '/' + end_date.getDate();
		} else if (period_type == 'monthly') { // This month
			start_date = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0);
			end_date = new Date(now.getFullYear(), now.getMonth() + 1, 0, 0, 0, 0);
			period_text = start_date.getFullYear() + '/' + (start_date.getMonth() + 1);
		}

		jobCan.getWorkSummariesInPeriod(start_date, end_date, {}, function (error, employees) {

			if (error) throw error;

			// Make a post message
			var mes = '-- JobCan - ' + period_type + ' - ' + period_text + ' --\n';
			employees.forEach(function (employee, index) {
				mes += employee.name + ' - ' + (employee.workTime / 60 / 60) + ' hours\n';
			});

			// Post to Slack
			self.slack.send({
				text: mes,
				channel: process.env.SLACK_CHANEL || null
			});

		});

	});

}


// ----


module.exports = PostBot;
