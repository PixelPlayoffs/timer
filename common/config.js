var os = require('os');

var config = {
    redis: { 
        port: 6379, 
        host: 'redis',
        timerPublishChannel: null
     },
     timer: {
        currentStatus: 'off', // off, running
        duration: null,
        timerRunning: 'running',
        timerOff: 'off',
        timerStarted: 'started',
        timerCountKnownState: 0
     },
     health: {
        svcName: 'Timer',
        host: os.hostname(),
        status: 'green'
    }
};

module.exports = config;