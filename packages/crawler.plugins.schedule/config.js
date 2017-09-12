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
            "timeout": 60000
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
                "discover": {
                    "multicast": { active: false },
                    "defined": { active: false },
                    "multicast": { active: false },
                    "guess": { active: false },
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