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
                "isbase": true,
                "host": process.env.HOST,
                // "stop": true,
                // "discover": {
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