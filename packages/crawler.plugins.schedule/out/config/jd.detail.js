"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "key": "jd.detail",
    "prefech": 3,
    "initFlow": [],
    "pages": [{
            "path": "/qa/(\\d+).html",
            "title": "京东详情页",
            "msgFlow": [{
                    "key": "queue",
                    "partten": "role:crawler.plugin.queue,cmd:queue",
                    "title": "把地址queue化",
                    "data": {
                        "queueConfig": {
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
                        },
                        "urls": ["https://item.jd.com/2444136.html"]
                    },
                    "result": "${'queueItem':$.[0]}"
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
                }]
        }]
};
//# sourceMappingURL=jd.detail.js.map