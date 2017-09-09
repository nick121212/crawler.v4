module.exports = {
    "options": {
        "crawler.plugin.store.es": {
            "host": "47.92.126.120:9500",
            "log": ["error","trace"],
            "sniffInterval": 30000,
            "requestTimeout": 20000
        },
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
                "stop": true,
                "sneeze": {
                    "silent": true,
                    "swim": { interval: 1111 }
                },
                "discover": {
                    "registry": {
                        "active": true
                    }
                },
                "listen": [{
                    "pin": "role:crawler.plugin.store.es,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}