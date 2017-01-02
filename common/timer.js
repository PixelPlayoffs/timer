var RedisHelper = require('./redis_helper');
var redisConfig = require('./config').redis;
var timerConfig = require('./config').timer;

var timer = {
    start: (duration) => {
        if (timerConfig.currentStatus === timerConfig.timerRunning) {
            return timerConfig.timerRunning;
        } else {
            timerConfig.currentStatus = timerConfig.timerRunning;

            var intervalCount = 1;
            var intervalTotal = duration;
            var KNOWN_STATE = 0;

            var interval = setInterval(() => {
                RedisHelper.publish(intervalCount);
                if (intervalCount === intervalTotal) {
                    timerConfig.currentStatus = timerConfig.timerOff;
                    clearInterval(interval);
                }
                ++intervalCount;
            }, 1000);

            return timerConfig.timerStarted;
        }
    }
};

module.exports = timer;