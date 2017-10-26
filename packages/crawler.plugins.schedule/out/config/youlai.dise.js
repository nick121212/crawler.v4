"use strict";
/**
 * 有来医生，从疾病页入口爬取规则
 *  1. 初始化队列
 *      * 入口页地址queue化
 *      * 保存入口页地址
 *      * 入口也地址存入queue
 *  2. 页面列表
 *      * 一级科室的爬取
 *          页面地址规则：/dise/pk_([3|4])_0_1.html
 *          队列信息：
 *              * 下载页面
 *              * 分析页面中的地址
 *              * 保存分析出的地址
 *              * 将保存的地址存入queue
 *              * 更新当前的地址信息
 *      * 二级科室的爬取
 *          页面地址规则：/dise/pk_([3|4])_([1-9]+)_1.html
 *          队列信息：
 *              * 下载页面
 *              * 分析页面获取疾病信息（当前选中的一级科室，二级科室，以及疾病信息）
 *              * 存储获取的疾病信息，存入es，index:youlai,type:dise
 *              * 把疾病信息的地址queue化
 *              * 存储疾病信息的地址
 *              * 存储疾病信息的地址放入queue
 *      * 疾病首页
 *          地址规则：/dise/(\\d+).html
 *          队列信息：
 *              * 下载页面
 *              * 分析页面中的文章列表地址
 *              * 保存分析出的地址
 *              * 将保存的地址存入queue
 *      * 疾病文章列表
 *          地址规则：/dise/articlelist/(\\d+)_(\\d+).html
 *          队列信息：
 *              * 下载页面
 *              * 分析页面中的地址，包括文章列表和文章详情的地址
 *              * 保存分析出的地址
 *              * 将保存的地址存入queue
 *      * 疾病文章详情
 *          地址规则：/yyk/article/(\\d+).html（不知道会不会漏掉，目前看都是这种规则）
 *          队列信息：
 *              * 下载页面
 *              * 分析页面，解析出文章的数据，content，createAt，tag，category，author，like，num
 *              * 保存文章数据到es
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "key": "youlai.dise",
    "title": "有来网爬取疾病的配置，这里抓取了儿科和妇科",
    "purge": true,
    "delay": 100,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startFlow",
    "pages": [{
            "path": "/yyk/article/(\\d+).html",
            "title": "疾病文章详情",
            "msgFlow": [{
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
                    "result": "${'result':$combine($.result[]){'result':$}}",
                    "data": {
                        "pages": [{
                                "key": "dise-list",
                                "path": "*",
                                "areas": [],
                                "fieldKey": "",
                                "fields": {
                                    "none": {
                                        "data": [{
                                                "key": "title",
                                                "methodInfo": { "text": [] },
                                                "selector": [".v_title"],
                                                "removeSelector": [],
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "createAt",
                                                "methodInfo": { "text": [] },
                                                "selector": [".v_info_01 .time"],
                                                "removeSelector": [],
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "author",
                                                "methodInfo": { "text": [] },
                                                "selector": [".doc_pic_box a li:eq(0)"],
                                                "removeSelector": [],
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "content",
                                                "methodInfo": { "html": [] },
                                                "selector": [".art_con .text"],
                                                "removeSelector": [],
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "like",
                                                "methodInfo": { "text": [] },
                                                "selector": [".a_evaluate"],
                                                "removeSelector": [],
                                                "dealStrategy": "normal"
                                            }, {
                                                "key": "num",
                                                "methodInfo": { "text": [] },
                                                "selector": [".v_info_01 .num"],
                                                "removeSelector": [],
                                                "formats": [
                                                    {
                                                        "key": "regexp", "settings": {
                                                            "regexp": "/\\d+/"
                                                        }
                                                    }
                                                ],
                                                "dealStrategy": "normal"
                                            }]
                                    }
                                },
                                "enabled": true
                            }]
                    }
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveResult",
                    "title": "存储爬取的数据",
                    "jsonata": ["$.result.{'result':$merge([$,{'categories':$$.categories,'tags':$$.tags}])}", "$.queueItem._id.{'_id':$}"],
                    "data": {
                        "esIndex": "youlai",
                        "esType": "article"
                    }
                }]
        }, {
            "path": "/dise/articlelist/(\\d+)_(\\d+).html",
            "title": "疾病文章列表",
            "msgFlow": [{
                    "partten": "role:crawler.plugin.downloader,cmd:html",
                    "title": "下载页面",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "save": false
                    },
                    "result": "${'queueItem':$}"
                }, {
                    "partten": "role:crawler.plugin.queue,cmd:analyze",
                    "title": "地址queue化",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "queueConfig": {
                            "ignoreWWWDomain": true,
                            "stripWWWDomain": false,
                            "scanSubdomains": false,
                            "host": "www.youlai.cn",
                            "initialProtocol": "https",
                            "initialPort": 80,
                            "stripQuerystring": false,
                            "allowQueryParams": [],
                            "fetchConditions": [],
                            "domainWhiteList": ["*"],
                            "filterByDomain": true
                        },
                        "discoverConfig": {
                            "whitePathList": [{ "path": "/dise/articlelist/(\\d+)_(\\d+).html", "enable": 1 }, { "path": "/yyk/article/(\\d+).html", "enable": 1 }]
                        }
                    },
                    "result": "${'queues':[$]}"
                }, {
                    "key": "urls",
                    "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queues{'urls':[$]}"],
                    "data": {
                        "esIndex": "youlai.dise",
                        "esType": "url"
                    },
                    "result": "${'saveUrls':$}"
                }, {
                    "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
                    "title": "把存储的url放入queue",
                    "jsonata": ["$.saveUrls{'items':[$.{'queueItem':$,'categories':$$.categories,'tags':$$.tags}]}"],
                    "data": {
                        "key": "youlai.dise"
                    }
                }]
        }, {
            "path": "/dise/(\\d+).html",
            "title": "疾病首页",
            "msgFlow": [{
                    "partten": "role:crawler.plugin.downloader,cmd:html",
                    "title": "下载页面",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "save": false
                    },
                    "result": "${'queueItem':$}"
                }, {
                    "partten": "role:crawler.plugin.queue,cmd:analyze",
                    "title": "地址queue化",
                    "jsonata": ["$.queueItem.{'queueItem':$}"],
                    "data": {
                        "queueConfig": {
                            "ignoreWWWDomain": true,
                            "stripWWWDomain": false,
                            "scanSubdomains": false,
                            "host": "www.youlai.cn",
                            "initialProtocol": "https",
                            "initialPort": 80,
                            "stripQuerystring": false,
                            "allowQueryParams": [],
                            "fetchConditions": [],
                            "domainWhiteList": ["*"],
                            "filterByDomain": true
                        },
                        "discoverConfig": {
                            "whitePathList": [{ "path": "/dise/articlelist/(\\d+)_1.html", "enable": 1 }]
                        }
                    },
                    "result": "${'queues':[$]}"
                }, {
                    "key": "urls",
                    "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queues{'urls':[$]}"],
                    "data": {
                        "esIndex": "youlai.dise",
                        "esType": "url"
                    },
                    "result": "${'saveUrls':$}"
                }, {
                    "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
                    "title": "把存储的url放入queue",
                    "jsonata": ["$.saveUrls{'items':[$.{'queueItem':$,'categories':$$.categories,'tags':$$.tags}]}"],
                    "data": {
                        "key": "youlai.dise"
                    }
                }]
        }, {
            "path": "/dise/pk_([3|4])_([1-9]+)_1.html",
            "title": "儿科、妇科的二级科室信息",
            "msgFlow": [{
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
                    "result": "${'result':$combine($.result[]){'result':$}}",
                    "data": {
                        "pages": [{
                                "key": "dise-list",
                                "path": "*",
                                "areas": [],
                                "fieldKey": "",
                                "fields": {
                                    "none": {
                                        "data": [{
                                                "key": "categories",
                                                "selector": [".article_l_top .cur:eq(0)"],
                                                "removeSelector": [],
                                                "dealStrategy": "array",
                                                "data": [{
                                                        "methodInfo": { "text": [] },
                                                        "htmlStrategy": "jsdom",
                                                        "dealStrategy": "normal"
                                                    }]
                                            }, {
                                                "key": "tags",
                                                "selector": [".article_l_top .cur:eq(1)"],
                                                "removeSelector": [],
                                                "dealStrategy": "array",
                                                "data": [{
                                                        "methodInfo": { "text": [] },
                                                        "htmlStrategy": "jsdom",
                                                        "dealStrategy": "normal"
                                                    }]
                                            }, {
                                                "key": "parent",
                                                "selector": [".disSearchMargin .cur:eq(0)"],
                                                "removeSelector": [],
                                                "dealStrategy": "object",
                                                "data": [{
                                                        "key": "link",
                                                        "methodInfo": { "attr": ["href"] },
                                                        "htmlStrategy": "jsdom",
                                                        "dealStrategy": "normal"
                                                    }, {
                                                        "key": "name",
                                                        "methodInfo": { "text": [] },
                                                        "htmlStrategy": "jsdom",
                                                        "dealStrategy": "normal"
                                                    }]
                                            }, {
                                                "key": "dises",
                                                "selector": [".disSearchList.cur dt a"],
                                                "removeSelector": [],
                                                "dealStrategy": "array",
                                                "data": [{
                                                        "key": "link",
                                                        "methodInfo": { "attr": ["href"] },
                                                        "htmlStrategy": "jsdom",
                                                        "dealStrategy": "normal"
                                                    }, {
                                                        "key": "name",
                                                        "methodInfo": { "text": [] },
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
                    "partten": "role:crawler.plugin.store.es,cmd:saveResult",
                    "title": "存储爬取的数据",
                    "jsonata": ["$.result.{'result':$}", "$.queueItem.path.{'_id':$}"],
                    "data": {
                        "esIndex": "youlai",
                        "esType": "dise"
                    }
                }, {
                    "partten": "role:crawler.plugin.queue,cmd:queue",
                    "title": "把疾病信息地址queue化",
                    "jsonata": ["$.result.result.dises{'urls':[$.link]}", "$.queueItem.{'queueItem':$}"],
                    "data": {
                        "queueConfig": {
                            "ignoreWWWDomain": true,
                            "stripWWWDomain": false,
                            "scanSubdomains": false,
                            "host": "www.youlai.cn",
                            "initialProtocol": "https",
                            "initialPort": 80,
                            "stripQuerystring": false,
                            "allowQueryParams": [],
                            "fetchConditions": [],
                            "domainWhiteList": ["*"],
                            "filterByDomain": true
                        }
                    },
                    "result": "${'queues':[$]}"
                }, {
                    "key": "urls",
                    "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queues{'urls':[$]}"],
                    "data": {
                        "esIndex": "youlai.dise",
                        "esType": "url"
                    },
                    "result": "${'saveUrls':$}"
                }, {
                    "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
                    "title": "把存储的url放入queue",
                    "jsonata": ["$.saveUrls{'items':[$.{'queueItem':$,'categories':$$.result.result.categories,'tags':$$.result.result.tags}]}"],
                    "data": {
                        "key": "youlai.dise"
                    }
                }]
        }, {
            "path": "/dise/pk_([3|4])_0_1.html",
            "title": "儿科、妇科的科室信息",
            "msgFlow": [{
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
                        "queueConfig": {
                            "ignoreWWWDomain": true,
                            "stripWWWDomain": false,
                            "scanSubdomains": false,
                            "host": "www.youlai.cn",
                            "initialProtocol": "https",
                            "initialPort": 80,
                            "stripQuerystring": false,
                            "allowQueryParams": [],
                            "fetchConditions": [],
                            "domainWhiteList": ["*"],
                            "filterByDomain": true
                        },
                        "discoverConfig": {
                            "whitePathList": [{ "path": "/dise/pk_([3|4])_(\\d+)_1.html", "enable": 1 }]
                        }
                    },
                    "result": "${'queues':[$]}"
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queues{'urls':[$]}"],
                    "data": {
                        "esIndex": "youlai.dise",
                        "esType": "url"
                    },
                    "result": "${'saveUrls':$}"
                }, {
                    "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
                    "title": "把存储的url放入queue",
                    "jsonata": ["$.saveUrls{'items':[$.{'queueItem':$}]}"],
                    "data": {
                        "key": "youlai.dise"
                    }
                }, {
                    "partten": "role:crawler.plugin.store.es,cmd:saveQueueItem",
                    "title": "存储爬取到的urls",
                    "jsonata": ["$.queueItem{'queueItem':$}"],
                    "data": {
                        "esIndex": "youlai.dise",
                        "esType": "queueItem"
                    }
                }]
        }
    ],
    "initFlow": [{
            "key": "queue",
            "partten": "role:crawler.plugin.queue,cmd:queue",
            "title": "把入口地址queue化",
            "data": {
                "queueConfig": {
                    "ignoreWWWDomain": true,
                    "stripWWWDomain": false,
                    "scanSubdomains": false,
                    "host": "www.youlai.cn",
                    "initialProtocol": "https",
                    "initialPort": 80,
                    "stripQuerystring": false,
                    "allowQueryParams": [],
                    "fetchConditions": [],
                    "domainWhiteList": ["*"],
                    "filterByDomain": true
                },
                "urls": ["https://www.youlai.cn/dise/pk_3_0_1.html", "https://www.youlai.cn/dise/pk_4_0_1.html"]
            },
            "result": "${'queues':[$]}"
        }, {
            "key": "urls",
            "partten": "role:crawler.plugin.store.es,cmd:saveUrls",
            "title": "存储爬取到的urls",
            "jsonata": ["$.queues{'urls':[$]}"],
            "data": {
                "esIndex": "youlai.dise",
                "esType": "url"
            },
            "result": "${'saveUrls':$}"
        }, {
            "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
            "title": "把存储的url放入queue",
            "jsonata": ["$.saveUrls{'items':[$.{'queueItem':$}]}"],
            "data": {
                "key": "youlai.dise"
            }
        }]
};
//# sourceMappingURL=youlai.dise.js.map