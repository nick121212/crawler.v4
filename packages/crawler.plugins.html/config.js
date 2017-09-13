module.exports = {
    "options": {
        "seneca": {
            timeout: 10000
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