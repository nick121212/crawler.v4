module.exports = {
    "options": {
        "crawler.plugin.store.es": {
            "host": "47.92.126.120:9500",
            "log": [],
            "sniffInterval": 30000,
            "requestTimeout": 20000
        },
        "seneca": {
            "timeout": 60000
        }
    },
    "plugins": {
        "pre": {
            // "consul-registry": {
            //     "host": "47.92.126.120"
            // },
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                // "discover": {
                //     "multicast": { active: false },
                //     "defined": { active: false },
                //     "multicast": { active: false },
                //     "guess": { active: false },
                //     "registry": {
                //         "active": true
                //     }
                // },
                "listen": [{
                    "pin": "role:crawler.plugin.store.es,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}