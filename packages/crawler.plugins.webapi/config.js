module.exports = {
    "options": {
        "senecaOptions": {

        }
    },
    "plugins": {
        "pre": {
            "basic": {},
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST
            }
        },
        "after": {
            "redis-store": {
                "uri": process.env.REDIS || "redis://123.59.44.152:6379",
                "options": {
                    "password": "crawler"
                },
                "web": { "dump": true }
            },
            "user": { "confirm": true }
        }
    }
}