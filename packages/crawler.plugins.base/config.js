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
                "auto": true,
                "host": process.env.HOST,
                "stop": true,
                "sneeze": {
                    // "silent": JSON.parse(SILENT),
                    "silent": true,
                    "swim": { interval: 1111 }
                },
                "discover": {
                    "registry": {
                        "active": true
                    }
                }
            }
        },
        "after": {

        }
    }
}