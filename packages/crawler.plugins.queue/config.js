module.exports = {
    "options": {
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            "consul-registry": {
                "host": "123.59.44.152"
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
                    "pin": "role:crawler.plugin.queue,cmd:*",
                    "port": 9003
                }]
            }
        },
        "after": {

        }
    }
}