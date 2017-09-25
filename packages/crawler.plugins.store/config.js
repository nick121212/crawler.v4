module.exports = {
    "options": {
        "crawler.plugin.store.es": {
            "host": process.env.ES || "47.92.126.120:9500",
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
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.store.es,cmd:*",
                    "timeout": 60000
                }]
            }
        },
        "after": {

        }
    }
}