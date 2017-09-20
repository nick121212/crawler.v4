module.exports = {
    "options": {
        "crawler.plugin.mq": {
            "url": process.env.RMQ || "amqp://nick:111111@123.59.43.166/crawler",
            "options": {}
        },
        "crawler.plugin.task": {
            "url": process.env.RMQ || "amqp://nick:111111@123.59.43.166/crawler",
            "options": {}
        },
        "senecaOptions": {
            "timeout": 60000
        }
    },
    "plugins": {
        "pre": {
            "redis-store": {
                "uri": process.env.REDIS || "redis://:123.59.44.152:6379",
                "options": {}
            },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.task,cmd:*",
                    "timeout": 60000
                }, {
                    "pin": "role:crawler.plugin.plugin,cmd:*",
                    "timeout": 60000
                }]
            }
        },
        "after": {

        }
    }
}