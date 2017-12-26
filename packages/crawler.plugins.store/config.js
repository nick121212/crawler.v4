module.exports = {
    "options": {
        "crawler.plugin.store.es": {
            "host": process.env.ES || "www.bebewiki.com",
            "httpAuth": "nick:13564548667",
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