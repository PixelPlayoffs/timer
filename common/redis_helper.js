var redis = require('redis');
var config = require('./config').redis;

var redis_helper = {
    GetRedisClient: () => {
        if (process.env.IS_DEBUG)
            return redis.createClient();
        else
            return redis.createClient(config.port, config.host);
    },
    publish: (message) => {
        var pub = redis_helper.GetRedisClient();
        pub.publish(config.timerPublishChannel, message);
        pub.quit();
    }
};

module.exports = redis_helper;