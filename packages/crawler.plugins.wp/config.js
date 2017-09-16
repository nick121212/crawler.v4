module.exports = {
    "options": {
        "seneca": {
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
                    "pin": "role:crawler.plugin.wp,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}