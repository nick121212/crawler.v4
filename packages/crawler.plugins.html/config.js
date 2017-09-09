module.exports = {
    "options": {
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            // "redis-store-expires": {
            //     "uri": "redis://:crawler@47.92.126.120:6379",
            //     "options": {},
            //     "expire": 2,
            //     "entityspec": {
            //         "-/-/downloads": {
            //             "expire": 2
            //         }
            //     }
            // },
            "consul-registry": {
                "host": "47.92.126.120"
            },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                // "stop": false,
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