# slackbot-jobcan-report

Unofficial Slackbot for JobCan.


----

## Features

* Report of daily/weekly/monthly work time

----


## Get Started

You can quick deploy to Heroku with using following button.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

After the quick deployment completed, please to finish the "[3. Make a Schedule for Auto Post](#deploy-3)" step.

----

## Deployment

### 1. Deploy to Heroku

```
$ heroku apps:create
$ git push heroku master
```

### 2. Make a Configuration

Firstly, please make an configuration on **[Slack Incoming Webhooks Integration](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)** page.
You can also get the *Webhook URL* from that page.

Nextly, set the Environment Variables to Your heroku app using following commands.

* **SLACK_WEBHOOK_URL** - Incoming Webhook URL of Slack
    * e.g. ``https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/zzzzzzzzzzzzzzzzzzzzzzzz``
* **SLACK_CHANEL** - Channel name of Slack
    * e.g. ``#general``
* **JC_COMPANY_ID** - Company ID of JobCan
* **JC_GROUP_MANAGER_ID** - Group Manager ID of JobCan
* **JC_PASSWORD** - Group Manager Password of JobCan

```
$ heroku config:set SLACK_WEBHOOK_URL=YOUR-WEBHOOK-URL
$ heroku config:set SLACK_CHANEL=#general
$ heroku config:set JC_COMPANY_ID=YOUR-JOBCAN-COMPANY-ID
$ heroku config:set JC_GROUP_MANAGER_ID=YOUR-JOBCAN-GROUP-MANAGER-ID
$ heroku config:set JC_PASSWORD=YOUR-JOBCAN-PASSWORD
```

After that, you can test run as follows.
```
$ heroku run "npm run post -- postWorkTimeSummaryWeekly"
```

### <a id="deploy-3">3. Make a Schedule for Auto Post</a>

Firstly, please install the "Heroku Schedule" to Your heroku app.
```
$ heroku addons:add scheduler:standard
```

Then, open the configuration page of Herou Schedule.
```
$ heroku addons:open scheduler
```

Then, fill the form in the page as following.
Please replace *YOUR-TASK-NAME* with chosen task name (e.g. ``postWorkTimeSummaryWeekly``) from [available tasks](#tasks).
You should also check the [available options](#options).

* **Script** - Command to run
	* Format: $ ``npm run post -- YOUR-TASK-NAME [YOUR-OPTIONS]``
	* Example: $ ``npm run post -- postWorkTimeSummaryWeekly --weekday-only``
* **Dyno Size** - Choose the ``Free``
* **Frequency** - As you want
* **Next Due** - As you want

Done!


----


## <a id="tasks">Tasks</a>

### Post of Work Time Summary

* Today: postWorkTimeSummaryToday
* Daily (Yesterday): postWorkTimeSummaryDaily
* Weekly: postWorkTimeSummaryWeekly
* Monthly: postWorkTimeSummaryMonthly


----

## <a id="options">Options</a>

These options can be appended when the task running.

### Weekday Only

It will run the task only on weekdays.

``--weekday-only``

----


## License

```
The MIT License (MIT)
Copyright (c) 2016 denLabo LLC
```
