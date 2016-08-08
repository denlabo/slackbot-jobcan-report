# slackbot-jobcan-report

Unofficial Slackbot for JobCan.


----

## Features

* Report of daily/weekly/monthly work time

----


## Get Started

<<<<<<< HEAD
You can quick deploy to Heroku with using following button.

https://heroku.com/deploy?template=https://github.com/heroku/node-js-sample/tree/master

After the quick deployment completed, please to finish the "[3. Make a Schedule for Auto Post](#deploy-3)" step.

----

## Deployment

=======
>>>>>>> 4a1417f9b25eb03d3c7b8fb1e0bb88d5be1bd8ec
### 1. Deploy to Heroku

```
$ heroku apps:create
$ git push heroku master
```

### 2. Make a Configuration

Firstly, please make an configuration on **[Slack Incoming Webhooks Integration](https://slack.com/apps/A0F7XDUAZ-incoming-webhooks)** page.
You can also get the *Webhook URL* from that page.

Nextly, set the Environment Variables to Your heroku app using following commands.

* SLACK_WEBHOOK_URL - Incoming Webhook URL of Slack
    * e.g. ``https://hooks.slack.com/services/XXXXXXXXX/YYYYYYYYY/zzzzzzzzzzzzzzzzzzzzzzzz``
* SLACK_CHANEL - Channel name of Slack
    * e.g. ``#general``
* JC_COMPANY_ID - Company ID of JobCan
* JC_GROUP_MANAGER_ID - Group Manager ID of JobCan
* JC_PASSWORD - Group Manager Password of JobCan

```
$ heroku config:set SLACK_WEBHOOK_URL=YOUR-WEBHOOK-URL
$ heroku config:set SLACK_CHANEL=#general
$ heroku config:set JC_COMPANY_ID=YOUR-JOBCAN-COMPANY-ID
$ heroku config:set JC_GROUP_MANAGER_ID=YOUR-JOBCAN-GROUP-MANAGER-ID
$ heroku config:set JC_PASSWORD=YOUR-JOBCAN-PASSWORD
```

After that, you can run test using the following command.
```
$ heroku run "npm run post -- postWorkTimeSummaryWeekly"
```

HINT: You can also execute the other tasks. See [available tasks list](#tasks).

<<<<<<< HEAD
### <a id="deploy-3">3. Make a Schedule for Auto Post</a>
=======
### 3. Make a Schedule for Auto Post
>>>>>>> 4a1417f9b25eb03d3c7b8fb1e0bb88d5be1bd8ec

Firstly, please install the "Heroku Schedule" to Your heroku app.
```
$ heroku addons:add scheduler:standard
```

Then, open the configuration page of Herou Schedule.
```
$ heroku addons:open scheduler
```

Then, fill the form in the page as following.
Please replace *YOUR-TASK-NAME* with chosen task name (e.g. ``postWorkTimeSummaryWeekly``) from task list.
* Script: $ ``npm run post -- YOUR-TASK-NAME``
* Dyno Size: Free
* Frequency: As you want
* Next Due: As you want

Done!


----


## <a id="tasks">Tasks</a>

### Post of Work Time Summary

* Daily: postWorkTimeSummaryDaily
* Weekly: postWorkTimeSummaryWeekly
* Monthly: postWorkTimeSummaryMonthly


----


## License

```
The MIT License (MIT)
Copyright (c) 2016 denLabo LLC
```
