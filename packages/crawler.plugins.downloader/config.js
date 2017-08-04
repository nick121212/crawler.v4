module.exports = {
    "options": {
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            "redis-store-expires": {
                "uri": "redis://123.59.44.152:6379",
                "host": "123.59.44.152",
                "port": 6379,
                "options": {},
                "expire": 20,
                "entityspec": {
                    "-/-/downloads": {
                        "expire": 60
                    }
                }
            },
            "consul-registry": {
                "host": "123.59.44.152"
            },
            "mesh": {
                "isbase": true,
                "auto": true,
                // "stop": false,
                "host": process.env.HOST,
                "discover": {
                    "registry": {
                        "active": true
                    }
                },
                "listen": [{
                    "pin": "role:crawler.plugin.downloader,cmd:*",
                    "port": 9001
                }]
            }
        },
        "after": {

        }
    }
}