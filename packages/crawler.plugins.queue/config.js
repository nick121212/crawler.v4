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
                    },
                    "guess": {
                        "active": true
                    }
                },
                // "sneeze": {
                //     // "silent": JSON.parse(SILENT),
                //     "silent": true,
                //     "swim": { interval: 1111 }
                // },
                "listen": [{
                    "pin": "role:crawler.plugin.queue,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}