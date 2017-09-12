module.exports = {
    "options": {
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            "redis-store-expires": {
                "host": "47.92.126.120",
                "port": 6379,
                "auth": "crawler",
                "expire": 20,
                "entityspec": {
                    "-/-/downloads": {
                        "expire": 60
                    }
                }
            },
            "consul-registry": {
                "host": "47.92.126.120"
            },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "discover": {
                    // "registry": {
                    //     "active": true
                    // }
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