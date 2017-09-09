module.exports = {
    "options": {
        "crawler.plugin.mq": {
            "url": "amqp://nick:111111@47.92.126.120/crawler",
            "options": {}
        },
        "crawler.plugin.task": {
            "url": "amqp://nick:111111@47.92.126.120/crawler",
            "options": {}
        },
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            "redis-store": {
                "uri": "redis://:crawler@47.92.126.120:6379",
                "options": {}
            },
            "consul-registry": {
                "host": "47.92.126.120"
            },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "stop": true,
                "sneeze": {
                    "silent": true,
                    "swim": { interval: 1111 }
                },
                "discover": {
                    "registry": {
                        "active": true
                    }
                },
                "listen": [{
                    "pin": "role:crawler.plugin.task,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}