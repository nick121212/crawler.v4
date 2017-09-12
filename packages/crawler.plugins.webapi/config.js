module.exports = {
    "options": {
        "seneca": {

        }
    },
    "plugins": {
        "pre": {
            "basic": {},
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
                }
            }
        },
        "after": {
            "redis-store": {
                "uri": "redis://47.92.126.120:6379",
                "options": {
                    "password": "crawler"
                },
                "web": { "dump": true }
            },
            "user": { "confirm": true }
        }
    }
}