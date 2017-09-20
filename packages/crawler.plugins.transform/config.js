module.exports = {
    "options": {
        "senecaOptions": {
            "timeout": 5000
        }
    },
    "plugins": {
        "pre": {
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.transform,cmd:*",
                }]
            }
        },
        "after": {

        }
    }
}