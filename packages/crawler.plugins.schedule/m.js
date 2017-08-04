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
                "uri": "redis://123.59.44.152:6379",
                "options": {}
            },
            "consul-registry": {
                "host": "123.59.44.152"
            },
            "mesh": {
                "monitor": true,
                "host": process.env.HOST
            }
        },
        "after": {

        }
    }
}