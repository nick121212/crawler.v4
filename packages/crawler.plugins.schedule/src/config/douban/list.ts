/**
 * 豆瓣
 */
export default {
    "key": "doubanList",
    "title": "douban列表的配置",
    "purge": true,
    "delay": 100,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
    "msgFlow": [{
        "key": "queue",
        "partten": "role:crawler.plugin.queue,cmd:queue",
        "title": "把地址queue化",
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
            },
            "urls": ["https://www.douban.com/group/meituikong/"]
        },
        "result": "${'queueItem':$[0]}"
    }, {
        "partten": "role:crawler.plugin.downloader,cmd:html",
        "title": "下载页面",
        "jsonata": ["$.queueItem.{'queueItem':$}"],
        "data": {
            "save": false
        },
        "result": "${'queueItem':$}"
    }, {
        "partten": "role:crawler.plugin.html,cmd:html",
        "jsonata": ["$.queueItem.{'queueItem':$}"],
        "result": "${'result':$combine($.result[])}",
        "data": {
            "pages": [{
                "key": "dise-list",
                "path": "*",
                "areas": [],
                "fields": {
                    "none": {
                        "data": [{
                            "key": "detailUrls",
                            "title": "详情页的地址",
                            "selector": ["#group-topics table tr:not(.th)"],
                            "data": [{
                                "key": "title",
                                "selector": [".title a"],
                                "methodInfo": { "text": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }, {
                                "key": "originUrl",
                                "selector": [".title a"],
                                "methodInfo": { "attr": ["href"] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }, {
                                "key": "author",
                                "selector": ["tr:eq(1) a"],
                                "methodInfo": { "text": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }, {
                                "key": "authorUrl",
                                "selector": ["tr:eq(1) a"],
                                "methodInfo": { "attr": ["href"] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }, {
                                "key": "like",
                                "selector": ["tr:eq(2)"],
                                "methodInfo": { "text": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }],
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "array"
                        }]
                    }
                },
                "enabled": true
            }]
        }
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把存储的url放入queue",
        "jsonata": ["$.{'items':[$.result.detailUrls]}"],
        "data": {
            "key": "doubanList",
            "routingKey": "crawler.url.doubanDetail"
        }
    }]
};
