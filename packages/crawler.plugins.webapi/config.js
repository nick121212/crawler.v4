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
                "uri": "redis://47.92.126.120:6379",
                "options": {
                    "password": "crawler"
                },
                "web": { "dump": true }
            },
            "user": { "confirm": true }
        }
    }
}