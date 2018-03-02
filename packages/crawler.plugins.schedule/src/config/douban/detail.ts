export default {
    "key": "doubanDetail",
    "title": "douban详情页的配置",
    "purge": true,
    "delay": 100,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
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
                "Cookie": "dbcl2=\"174606656:YW2RDyjCUvQ\";"
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
                            "title": "文章详情内容",
                            "selector": ["#link-report"],
                            "methodInfo": { "text": [] },
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "normal",
                            "formats": [{ "key": "trim", "settings": { "start": true, "middle": true, "end": true } }]
                        }, {
                            "key": "images",
                            "title": "文章详情中的所有图片",
                            "selector": ["#link-report img"],
                            "methodInfo": { "html": [] },
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "array",
                            "data": [{
                                "methodInfo": { "attr": ["src"] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }]
                        }]
                    }
                },
                "enabled": true
            }]
        }
    }, {
        "partten": "role:crawler.plugin.transform,cmd:single",
        "jsonata": ["$.{'data':$$.result.images}"],
        "condition":"$boolean($$.result.images)",
        "data": {
            "expression": "${'images':$join($$,'--------')}"
        },
        "result": "$"
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把解析到的数据存入到mq中",
        "jsonata": ["$.{'items':[$.result]}"],
        "data": {
            "key": "doubanDetail",
            "routingKey": "crawler.url.lait.tv.result"
        }
    }]
};
