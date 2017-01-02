var express = require('express');
var bodyParser = require('body-parser');
var timer = require('./common/timer');
var redisConfig = require('./common/config').redis;
var timerConfig = require('./common/config').timer;
var healthConfig = require('./common/config').health;
var app = express();

app.use(bodyParser.json());
const port = 3001;

// POST: http://localhost:3001/api/timer
// BODY: { "playoffName": "ScoreBoard", "duration": "5" }
// pub/sub channel is playoffName + _timer
// @tripdubroot
app.post('/api/timer', (req, res) => {
    try {
        if (req.body.playoffName === undefined || null) throw new Error('No name.');
        redisConfig.timerPublishChannel = req.body.playoffName + "_timer";

        if (req.body.duration === undefined || null) throw new Error('No duration.');
        timerConfig.duration = parseInt(req.body.duration);
    } catch (error) {
        res.send(JSON.stringify({ 
            status: 'error', 
            message: 'You need channel and count in body'
        }), null, 2);
        return;
    }

    var status = timer.start(timerConfig.duration);
    var timerStatus;
    
    if (status === timerConfig.timerStarted)
        timerStatus = { status: status, message: "Running for: " + timerConfig.duration + " seconds."};
    else if (status === timerConfig.timerRunning)
        timerStatus = { status: status, message: "This timer is already running"};

    res.send(JSON.stringify(timerStatus, null, 2));
});

app.get('/health', (req, res) => {
    res.status(200).send(JSON.stringify(healthConfig));
});

app.listen(port, ()=>{
    console.log('pp-timer-svc running at http://localhost:' + port);
});