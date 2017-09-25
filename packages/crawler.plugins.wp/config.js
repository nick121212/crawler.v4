module.exports = {
    "options": {
        "senecaOptions": {
            "timeout": 120000
        }
    },
    "plugins": {
        "pre": {
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.wp,cmd:*",
                    "timeout": 120000
                }]
            }
        },
        "after": {

        }
    }
}