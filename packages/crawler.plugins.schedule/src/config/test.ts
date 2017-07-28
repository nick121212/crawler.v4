export default {
    "key": "babytree2",
    "initUrls": ["http://www.babytree.com/ask/myqa__view~mlist,tab~D,pg~1"],
    "donePlugins": { "crawler.result.plugin.babytree": { "cmd": "babytree", "role": "crawler.result.plugin" } },
    "plugins": [{
        "key": "crawler.plugins.downloader",
        "pattern": { "role": "crawler.plugins", "cmd": "downloader" }
    }, {
        "key": "crawler.plugins.url",
        "pattern": { "role": "crawler.plugins", "cmd": "url" },
        "resultPath": "/url",
        "config": {
            "queueConfig": {
                "ignoreWWWDomain": false,
                "stripWWWDomain": false,
                "scanSubdomains": true,
                "host": "www.yaolan.com",
                "initialProtocol": "http",
                "initialPort": 80,
                "stripQuerystring": true,
                "fetchConditions": [],
                "domainWhiteList": ["www.babytree.com"],
                "filterByDomain": true
            },
            "discoverConfig": {
                "parseHTMLComments": false,
                "parseScriptTags": false,
                "allowedProtocols": ["http", "https"],
                "whitePathList": [{
                    "path": "/ask/detail/:id",
                    "enable": true
                }, {
                    "path": "/ask/myqa__view~mlist,tab~D,pg~:pg",
                    "enable": true
                }],
                "userAgent": "",
                "fetchWhitelistedMimeTypesBelowMaxDepth": false,
                "maxDepth": 0,
                "ignoreRobots": true
            }
        }
    }, {
        "key": "crawler.plugins.html",
        "pattern": { "role": "crawler.plugins", "cmd": "html" },
        "resultPath": "/result",
        "config": {
            "pages": [{
                "key": "health-post",
                "path": "/ask/detail/:id",
                "areas": [],
                "fieldKey": "",
                "fields": {
                    "none": {
                        "data": [{
                            "key": "title",
                            "selector": [".qa-title h1"],
                            "removeSelector": ["i"],
                            "methodInfo": { "text": [] },
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "normal"
                        }, {
                            "key": "categorys",
                            "selector": [".bui-breadcrumb > a"],
                            "dealStrategy": "array",
                            "data": [{
                                "methodInfo": { "text": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }]
                        }, {
                            "key": "tags",
                            "selector": [".qa-meta .tags span > a"],
                            "dealStrategy": "array",
                            "data": [{
                                "methodInfo": { "text": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal"
                            }]
                        }, {
                            "key": "comments",
                            "selector": [".qa-answer-list > li"],
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "array",
                            "data": [{
                                "key": "content",
                                "selector": [".answer-text"],
                                "methodInfo": { "text": [] },
                                "formats": [{ "key": "trim", "settings": { "start": true, "end": true } }]
                            }, {
                                "key": "like",
                                "selector": [".qa-answer-list-vote span em"],
                                "methodInfo": { "text": [] },
                                "formats": [{ "key": "num" }]
                            }]
                        }]
                    }
                },
                "enabled": true
            }, {
                "key": "health-post",
                "path": "/ask/detail/:id",
                "areas": [],
                "fieldKey": "",
                "fields": {
                    "none": {
                        "data": [{
                            "key": "bestContent",
                            "selector": [".best-content .answer-text"],
                            "methodInfo": { "html": [] },
                            "formats": []
                        }]
                    }
                },
                "enabled": true
            }]
        }
    }]
};