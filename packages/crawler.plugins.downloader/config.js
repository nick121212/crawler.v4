module.exports = {
    "options": {
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
                // "discover": {
                //     "registry": {
                //         "active": true
                //     }
                // },
                "listen": [{
                    "type": "tcp",
                    "pin": "role:crawler.plugin.downloader,cmd:*",
                    "timeout": 60000
                }]
            }
        },
        "after": {

        }
    }
}