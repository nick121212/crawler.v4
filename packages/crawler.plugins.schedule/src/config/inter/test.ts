export default {
    "parttern": "role:crawler.plugin.plugin,cmd:testFlow",
    "config": {
        "data": {
            "originUrl": "https://www.douban.com/group/topic/111042548/",
            "author": "齐天少女",
            "authorUrl": "https://www.douban.com/people/170937849/",
            "like": "13"
        },
        "key": "doubanList",
        "title": "douban详情页的配置",
        "purge": true,
        "delay": 5000,
        "prefech": 1,
        "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
        "msgFlow": [{
            "partten": "role:crawler.plugin.transform,cmd:single",
            "jsonata": ["${'data':$$}"],
            "data": {
                "expression": "$.{'result':$$}"
            },
            "result": "$.result"
        }, {
            "partten": "role:crawler.plugin.queue,cmd:queue",
            "title": "把地址queue化",
            "jsonata": ["$.{'urls':[$$.originUrl]}"],
            "data": {
                "queueConfig": {
                    "ignoreWWWDomain": true,
                    "stripWWWDomain": false,
                    "scanSubdomains": false,
                    "host": "www.douban.com",
                    "initialProtocol": "https",
                    "initialPort": 80,
                    "stripQuerystring": false,
                    "allowQueryParams": [],
                    "fetchConditions": [],
                    "domainWhiteList": ["*"],
                    "filterByDomain": true
                }
            },
            "result": "${'queueItem':$[0]}"
        }, {
            "partten": "role:crawler.plugin.downloader,cmd:html",
            "title": "下载页面",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "data": {
                "save": false,
                "engine": "superagent",
                "header": {
                    "Cookie": "bid=hNu_TjLIVX0; __yadk_uid=bzXm0KNbXIgPPn8HSYqFvApFNR8wDedU; ll=\"108296\"; _vwo_uuid_v2=49098C96E44F149C32B802A921D721AF|c8ade32f54b25436b272c029c4a65b5e; push_noty_num=0; push_doumail_num=0; __utmv=30149280.16924; ap=1; dbcl2=\"169248639:g9iNSRdktEk\"; ck=Gze-; __utmc=30149280; __utmz=30149280.1513844581.9.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1514352705%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3D5CjIAS_tB6rdw9GzDbooRliM24AtVP4J789ku3qiT67b4vemnstufGwkkmRoWm8GIy8Qy7Hvs01letueQEs3f_%26wd%3D%26eqid%3D98eb35ec000110b2000000045a3b6df0%22%5D; _pk_id.100001.8cb4=5eda58f6467f1643.1508223798.12.1514352705.1514276808.; _pk_ses.100001.8cb4=*; __utma=30149280.90236051.1508223798.1514276706.1514352706.11; __utmt=1; __utmb=30149280.6.6.1514352706"
                }
            },
            "result": "${'queueItem':$}"
        }, {
            "partten": "role:crawler.plugin.html,cmd:html",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "result": "${'result':$combine($.result[])}",
            "data": {
                "pages": [{
                    "key": "detail",
                    "path": "*",
                    "areas": [],
                    "fields": {
                        "none": {
                            "data": [{
                                "key": "content",
                                "title": "详情页的地址",
                                "selector": ["#link-report"],
                                "methodInfo": { "html": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal",
                                "formats": [{ "key": "trim", "settings": { "start": true, "middle": true, "end": true } }]
                            }]
                        }
                    },
                    "enabled": true
                }]
            }
        }, {
            "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
            "title": "把解析到的数据存入到mq中",
            "jsonata": ["$.{'items':[$.result]}"],
            "data": {
                "key": "doubanList",
                "routingKey": "lait.tv.result"
            }
        }]
    }
};
