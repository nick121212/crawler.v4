module.exports = {
    "options": {
        "senecaOptions": {
            "timeout": 30000
        }
    },
    "plugins": {
        "pre": {
            "basic": {},
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.webapi,cmd:*",
                }]
            }
        },
        "after": {
            "redis-store": {
                "uri": process.env.REDIS || "redis://123.59.44.152:6379",
                "options": {}
            },
            "user": { "confirm": true }
        }
    }
}