"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var queueConfig = {
    "ignoreWWWDomain": true,
    "stripWWWDomain": false,
    "scanSubdomains": false,
    "host": "mamilove.com.tw",
    "initialProtocol": "https",
    "initialPort": 80,
    "stripQuerystring": false,
    "allowQueryParams": ["page"],
    "fetchConditions": [],
    "domainWhiteList": ["*mamilove.com.tw"],
    "filterByDomain": true
};
exports.default = {
    key: "mamilove",
    initFlow: [{
            "key": "queue",
            "partten": "role:crawler.plugin.queue,cmd:queue",
            "title": "把地址queue化",
            "data": {
                "queueConfig": queueConfig,
                "urls": ["https://mamilove.com.tw/qa", "https://mamilove.com.tw/blog"]
            },
            "result": "${'queues':[$]}"
        }, {
            "key": "urls",
            "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
            "title": "存储爬取到的urls",
            "jsonata": ["$.queues{'urls':[$]}"],
            "data": {
                "esIndex": "mamilove",
                "esType": "url"
            },
            "result": "${'saveUrls':$}"
        }, {
            "partten": "role:crawler.plugin.mq,cmd:addItemToQueue",
            "title": "把存储的url放入queue",
            "jsonata": ["$.saveUrls{'items':[$]}"],
            "data": {
                "key": "mamilove",
            }
        }],
    pages: [{
            path: "/qa/:id",
            title: "妈咪love详情页",
            msgFlow: [{
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
                    "result": "${'results':$}",
                    "data": {
                        "pages": [{
                                "key": "qa-detail",
                                "path": "/qa/:id",
                                "areas": [],
                                "fieldKey": "",
                                "fields": {
                                    "none": {
                                        "data": [{
                                                "key": "title",
                                                "selector": [".qa-item-list .qa-item-subject-link:eq(0)"],
                                                "removeSelector": [],
                                                "methodInfo": { "text": [] },
                                                "htmlStrategy": "jsdom",
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "createAt",
                                                "selector": [".qa-item-list .qa-item-info:eq(0)"],
                                                "removeSelector": [".qa-item-author"],
                                                "methodInfo": { "text": [] },
                                                "htmlStrategy": "jsdom",
                                                "dealStrategy": "normal",
                                                "formats": [{
                                                        "key": "regexp",
                                                        "settings": { "regexp": "/\\d+/", "scope": "i", "index": 0 }
                                                    }, {
                                                        "key": "num"
                                                    }]
                                            }, {
                                                "key": "content",
                                                "selector": [".qa-item-list .qa-item-content:eq(0)"],
                                                "removeSelector": [],
                                                "methodInfo": { "html": [] },
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "age",
                                                "selector": [".qa-item-list .qa-item-right-status:eq(0) span:eq(-2) a"],
                                                "removeSelector": [],
                                                "methodInfo": { "html": [] },
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "category",
                                                "selector": [".qa-item-list .qa-item-right-status:eq(0) span:eq(-1) a"],
                                                "dealStrategy": "normal",
                                                "methodInfo": { "text": [] }
                                            }, {
                                                "key": "comments",
                                                "selector": [".qa-item-list .qa-answer-list:eq(0) > .qa-answer-item"],
                                                "htmlStrategy": "jsdom",
                                                "dealStrategy": "array",
                                                "data": [{
                                                        "key": "content",
                                                        "selector": [".qa-answer-item-content .qa-answer-content"],
                                                        "methodInfo": { "text": [] },
                                                        "formats": [{ "key": "trim", "settings": { "start": true, "end": true } }]
                                                    }, {
                                                        "key": "like",
                                                        "selector": [".qa-answer-like-num"],
                                                        "methodInfo": { "attr": ["data-count"] },
                                                        "formats": [{ "key": "num" }]
                                                    }]
                                            }]
                                    }
                                },
                                "enabled": true
                            }]
                    }
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveResult",
                    "title": "存储爬取的数据",
                    "jsonata": ["$combine($.results.result[]){'result':$}", "$.queueItem._id.{'id':$}"],
                    "data": {
                        "esIndex": "qa",
                        "esType": "mamilove"
                    }
                }]
        }, {
            path: "/qa",
            title: "妈咪love列表页",
            msgFlow: [{
                    "partten": "role:crawler.plugin.downloader,cmd:html",
                    "title": "下载页面",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "save": false
                    },
                    "result": "${'queueItem':$}"
                }, {
                    "partten": "role:crawler.plugin.queue,cmd:analyze",
                    "title": "分析页面中的urls",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "queueConfig": queueConfig,
                        "discoverConfig": {
                            whitePathList: [{ path: "/qa", enable: 1 }, { path: "/qa/(\\d+)", enable: 1 }]
                        }
                    },
                    "result": "${'queues':$}"
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queues{'urls':[$]}"],
                    "data": {
                        "esIndex": "mamilove",
                        "esType": "url"
                    },
                    "result": "${'saveUrls':$}"
                }, {
                    "partten": "role:crawler.plugin.mq,cmd:addItemToQueue",
                    "title": "把存储的url放入queue",
                    "jsonata": ["$.saveUrls{'items':[$]}"],
                    "data": {
                        "key": "mamilove",
                    }
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveQueueItem",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queueItem{'queueItem':$}"],
                    "data": {
                        "esIndex": "mamilove",
                        "esType": "queueItem"
                    }
                }]
        }, {
            path: "/blog",
            title: "妈咪love专栏列表页",
            msgFlow: [{
                    "partten": "role:crawler.plugin.downloader,cmd:html",
                    "title": "下载页面",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "save": false
                    },
                    "result": "${'queueItem':$}"
                }, {
                    "partten": "role:crawler.plugin.queue,cmd:analyze",
                    "title": "分析页面中的urls",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "queueConfig": queueConfig,
                        "discoverConfig": {
                            whitePathList: [{ path: "/blog", enable: 1 }, { path: "/blog/(\\d+)/:title", enable: 1 }]
                        }
                    },
                    "result": "${'queues':$}"
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queues{'urls':[$]}"],
                    "data": {
                        "esIndex": "mamilove",
                        "esType": "url"
                    },
                    "result": "${'saveUrls':$}"
                }, {
                    "partten": "role:crawler.plugin.mq,cmd:addItemToQueue",
                    "title": "把存储的url放入queue",
                    "jsonata": ["$.saveUrls{'items':[$]}"],
                    "data": {
                        "key": "mamilove",
                    }
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveQueueItem",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queueItem{'queueItem':$}"],
                    "data": {
                        "esIndex": "mamilove",
                        "esType": "queueItem"
                    }
                }]
        }, {
            path: "/blog/(\\d+)/:title",
            title: "妈咪love专栏详情页",
            msgFlow: [{
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
                    "result": "${'results':$}",
                    "data": {
                        "pages": [{
                                "key": "blog-detail",
                                "path": "*",
                                "areas": [],
                                "fieldKey": "",
                                "fields": {
                                    "none": {
                                        "data": [{
                                                "key": "title",
                                                "selector": [".blog-title"],
                                                "removeSelector": [],
                                                "methodInfo": { "text": [] },
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "categories",
                                                "selector": [".blog-info-wrapper .blog-tag"],
                                                "removeSelector": [],
                                                "dealStrategy": "array",
                                                "data": [{
                                                        "methodInfo": { "text": [] },
                                                        "htmlStrategy": "jsdom",
                                                        "dealStrategy": "normal"
                                                    }]
                                            }, {
                                                "key": "content",
                                                "selector": [".blog-article"],
                                                "removeSelector": [],
                                                "methodInfo": { "html": [] },
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "like",
                                                "selector": [".comment-bar .comment-link:eq(0)"],
                                                "removeSelector": [],
                                                "methodInfo": { "text": [] },
                                                "dealStrategy": "normal",
                                                "formats": [{
                                                        "key": "regexp",
                                                        "settings": { "regexp": "/\\d+/", "scope": "i", "index": 0 }
                                                    }, {
                                                        "key": "num"
                                                    }]
                                            }, {
                                                "key": "createAt",
                                                "selector": [".blog-info-wrapper .blog-info"],
                                                "removeSelector": ["a", "span"],
                                                "dealStrategy": "normal",
                                                "methodInfo": { "text": [] }
                                            }]
                                    }
                                },
                                "enabled": true
                            }]
                    }
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveResult",
                    "title": "存储爬取的数据",
                    "jsonata": ["$combine($.results.result[]){'result':$}", "$.queueItem._id.{'id':$}"],
                    "data": {
                        "esIndex": "blog",
                        "esType": "mamilove"
                    }
                }]
        }]
};
//# sourceMappingURL=milove.1.js.map