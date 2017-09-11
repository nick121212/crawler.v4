module.exports = {
    "options": {
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            "consul-registry": {
                "host": "47.92.126.120"
            },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "discover": {
                    "registry": {
                        "active": true
                    }
                },
                "listen": [{
                    "pin": "role:crawler.plugin.html,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}