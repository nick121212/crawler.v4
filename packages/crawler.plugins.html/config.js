module.exports = {
    "options": {
        "seneca": {
            timeout: 10000
        }
    },
    "plugins": {
        "pre": {
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.html,cmd:*",
                    "type": "tcp"
                }]
            }
        },
        "after": {

        }
    }
}