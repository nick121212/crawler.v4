module.exports = {
    "options": {
        "senecaOptions": {
            "timeout": 60000
        }
    },
    "plugins": {
        "pre": {
            "consul-registry": {
                "host": process.env.CONSUL || "47.92.126.120"
            },
            "mesh": {
                "isbase": true,
                "stop": false,
                "host": process.env.HOST,
                // "discover": {
                //     "multicast": { active: true },
                //     "defined": { active: false },
                //     "multicast": { active: false },
                //     "guess": { active: false },
                //     "registry": {
                //         "active": true
                //     }
                // }
            }
        },
        "after": {

        }
    }
}