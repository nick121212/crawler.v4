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
                    "multicast": { active: false },
                    "defined": { active: false },
                    "multicast": { active: false },
                    "guess": { active: false },
                    "registry": {
                        "active": true
                    }
                },
                "listen": [{
                    "pin": "role:crawler.plugin.queue,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}