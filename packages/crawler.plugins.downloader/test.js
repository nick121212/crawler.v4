var Seneca = require('seneca')

let client = Seneca({
        log: 'debug'
    })
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
    }).ready(function () {
        setInterval(() => {
            this.act("role:crawler.plugin.downloader,cmd:interface", {
                url: "http://47.92.126.120:9200",
                path:"/index/_analyze",
                method: "get",
                params: {
                    text: "中华人民共和国MN",
                    tokenizer: "ik_smart"
                }
            }, (err, res) => {
                if (err) {
                    console.log(err.message);
                } else {
                    console.log(JSON.parse(res.responseBody));
                }
            });

        }, 1000);
    });