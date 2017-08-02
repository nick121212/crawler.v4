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
                "expire": 2,
                "entityspec": {
                    "-/-/downloads": {
                        "expire": 2
                    }
                }
            },
            "consul-registry": {
                "host": "123.59.44.152"
            },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": "127.0.0.1",
                "discover": {
                    "registry": {
                        "active": true
                    }
                },
                "listen": [{
                    "pin": "role:crawler.plugin.html,cmd:*",
                    "port": 9002
                }]
            }
        },
        "after": {

        }
    }
}