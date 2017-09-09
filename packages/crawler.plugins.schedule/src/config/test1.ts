export default {
    key: "testplugin2",
    initPlugins: [{
        "key": "queue",
        "partten": "role:crawler.plugin.queue,cmd:queue",
        "title": "把地址queue化",
        "data": {
            "queueConfig": {
                "ignoreWWWDomain": false,
                "stripWWWDomain": false,
                "scanSubdomains": true,
                "host": "www.jd.com",
                "initialProtocol": "https",
                "initialPort": 80,
                "stripQuerystring": false,
                "fetchConditions": [],
                "domainWhiteList": ["(.*?).jd.com"],
                "filterByDomain": true
            },
            "urls": ["https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/"]
        },
        "result": "${'queues':[$]}"
    }, {
        "key": "urls",
        "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
        "title": "存储爬取到的urls",
        "jsonata": ["$.queues{'urls':[$]}"],
        "data": {
            "esIndex": "testplugin2",
            "esType": "url"
        },
        "result": "${'saveUrls':$}"
    }, {
        "partten": `role:crawler.plugin.mq,cmd:addItemToQueue`,
        "title": "把存储的url放入queue",
        "jsonata": ["$.saveUrls{'items':[$]}"],
        "data": {
            "key": "testplugin2",
        }
    }],
    msgPlugins: [{
        "partten": "role:crawler.plugin.downloader,cmd:html",
        "title": "下载页面",
        "jsonata": ["$.queueItem.{'queueItem':$}"],
        "data": {
            "save": false
        },
        "result": "${'queueItem':$}"
    }, {
        "partten": "role:crawler.plugin.html,cmd:html",
        "title": "分析页面",
        "jsonata": ["$.queueItem{'queueItem':$}"],
        "data": {
            "pages": [{
                "key": "brandlist",
                "path": "*",
                "enabled": 1,
                "fields": {
                    "none": {
                        "data": [{
                            "key": "totalPage",
                            "dealStrategy": "normal",
                            "selector": [
                                "#J_topPage .fp-text i"
                            ],
                            "methodInfo": {
                                "text": []
                            }
                        },
                        {
                            "key": "skus",
                            "selector": ["#J_goodsList ul:eq(0) > li"],
                            "dealStrategy": "array",
                            "data": [{
                                "key": "sku",
                                "selector": [],
                                "dealStrategy": "normal",
                                "methodInfo": {
                                    "attr": ["data-sku"]
                                }
                            },
                            {
                                "key": "price",
                                "selector": [".p-price i"],
                                "dealStrategy": "normal",
                                "methodInfo": {
                                    "text": []
                                }
                            },
                            {
                                "key": "comment",
                                "selector": [".p-commit strong a"],
                                "dealStrategy": "normal",
                                "methodInfo": {
                                    "text": []
                                },
                                "formats": [{
                                    "key": "regexp",
                                    "settings": {
                                        "regexp": "/\\d+/",
                                        "index": 0
                                    }
                                }, {
                                    "key": "num"
                                }]
                            }
                            ]
                        }
                        ]
                    }
                }
            }]
        },
        "result": "${'results':[$]}"
    }, {
        "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
        "title": "存储爬取到的urls",
        "jsonata": ["$.queues{'urls':[$]}"],
        "data": {
            "esIndex": "testplugin2",
            "esType": "url"
        },
        "result": "${'saveUrls':$}"
    }, {
        "partten": `role:crawler.plugin.mq,cmd:addItemToQueue`,
        "title": "把存储的url放入queue",
        "jsonata": ["$.saveUrls{'items':[$]}"],
        "data": {
            "key": "testplugin2",
        }
    }, {
        "partten": "role:crawler.plugin.store.es,cmd:saveQueueItem",
        "title": "存储爬取到的urls",
        "jsonata": ["$.queueItem{'queueItem':$}"],
        "data": {
            "esIndex": "testplugin2",
            "esType": "queueItem"
        }
    }, {
        "partten": "role:crawler.plugin.store.es,cmd:saveResult",
        "title": "存储爬取的数据",
        "jsonata": ["$combine($.results.result[]){'result':$}", "$.queueItem._id.{'id':$}"],
        "data": {
            "esIndex": "jd",
            "esType": "result"
        }
    }]
};