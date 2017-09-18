module.exports = {
    "options": {
        "senecaOptions": {

        }
    },
    "plugins": {
        "pre": {
            "mesh": {
                "isbase": false,
                "auto": true,
                "host": process.env.HOST,
                "listen": [{
                    "pin": "role:crawler.plugin.queue,cmd:*"
                }]
            }
        },
        "after": {

        }
    }
}