export default {
    "parttern": "role:crawler.plugin.plugin,cmd:testFlow",
    "config": {
        "data": {},
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
                }, "urls": ["https://www.douban.com/"]
            },
            "result": "${'queueItem':$[0]}"
        }, {
            "partten": "role:crawler.plugin.downloader,cmd:html",
            "title": "下载页面",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "data": { "save": false },
            "result": "${'queueItem':$}"
        },
        {
            "partten": "role:crawler.plugin.html,cmd:html",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "result": "${'result':$combine($.result[])}",
            "data": {
                "pages": [{
                    "key": "dise-list", "path": "*",
                    "areas": [],
                    "fields": {
                        "none": {
                            "data": [{
                                "key": "groups",
                                "title": "豆瓣首页的类目信息",
                                "selector": [".cate.group-cate ul"],
                                "data": [{
                                    "key": "label",
                                    "selector": [".cate-label"],
                                    "methodInfo": { "text": [] },
                                    "htmlStrategy": "jsdom",
                                    "dealStrategy": "normal",
                                    "formats": [{
                                        "key": "trim",
                                        "settings": { "start": true, "end": true, "mimddle": true }
                                    }, {
                                        "key": "split",
                                        "settings": {
                                            "splitOf": "»",
                                            "start": 0, "end": 1
                                        }
                                    }]
                                }, {
                                    "key": "cates",
                                    "title": "豆瓣首页的类目信息",
                                    "selector": ["li:not(.cate-label)"],
                                    "htmlStrategy": "jsdom",
                                    "dealStrategy": "array",
                                    "data": [{
                                        "selector": ["a"],
                                        "methodInfo": { "text": [] }
                                    }]
                                }], "htmlStrategy": "jsdom", "dealStrategy": "array"
                            }]
                        }
                    }, 
                    "enabled": true
                }]
            }
        }, {
            "partten": "role:crawler.plugin.transform,cmd:single",
            "jsonata": ["${'data':$$.result}"],
            "data": {
                "expression": "$map($$.groups,function($v,$k){{'label': $v.label,'cates': $join($v.cates,',')}})"
            },
            "result": "$"
        }]
    }

};
