var Seneca = require('seneca')

let client = Seneca({
        log: 'debug'
    })
    .test('print')
    .use("balance-client")
    .use('consul-registry', {
        host: '47.92.126.120'
    })
    .use('mesh', {
        discover: {
            registry: {
                active: true
            }
        }
    }).ready(function() {
        setInterval(() => {
            this.act("role:crawler.plugin.downloader,cmd:download", { queueItem: { url: "http://www.baidu.com" } }, (err, res) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(res.statusCode);
                }
            });

        }, 1000);
    });