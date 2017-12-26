module.exports = {
    "options": {
        "crawler.plugin.kue": {
            "redis": {
                port: 6379,
                host: process.env.REDIS || "123.59.44.152",
                "options": {}
            },
            "db": 3,
            "restore": true
        },
        "senecaOptions": {
            "timeout": 60000
        }
    },
    "plugins": {
        "pre": {
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.kue,cmd:*",
                    "timeout": 60000
                }]
            }
        },
        "after": {

        }
    }
}