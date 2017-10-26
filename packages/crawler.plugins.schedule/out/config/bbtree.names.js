"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 地址规则：
 *  http://www.babytree.com/community/discuz_ajax.php?action=get_newsfeed_list&type=elite&ts=0&bool=false
 *  其中ts参数为变化值，其调用结果中，返回了start_last_response_ts字段，意为下一次的开始时间戳
 *
 * 初始化队列顺序
 *  1. queue化初始化的接口地址
 *  2. 把地址存入queue
 * 消息队列的顺序
 *  1. 格式化queue中取到的数据，转换成 { queueItem:$ }
 *  2. 调用接口，返回数据 { interInfo: $ }
 *  3. 获取interInfo中的start_last_response_ts字段，合并到根数据的last_ts字段
 *  4. 获取interInfo中的responseBody字段，合并到queueItem
 *  5. 分析queueItem中responseBody中的人名数据
 *  6. 拼接下一个接口地址，使用last_ts拼接参数，返回 {nextQueueItem : $}
 *  7. 把nextQueueItem数据存入queue中
 *  8. 把分析出来的人名存入queue中
 *  9. 循环1-8，直到interInfo中的has_prev字段为false
 */
exports.default = {
    "key": "bbtree.names",
    "title": "bbtree爬取人名的配置",
    "purge": true,
    "delay": 200,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [{
            "key": "queue",
            "partten": "role:crawler.plugin.queue,cmd:queue",
            "title": "把地址queue化",
            "data": {
                "queueConfig": {
                    "ignoreWWWDomain": true,
                    "stripWWWDomain": false,
                    "scanSubdomains": false,
                    "host": "www.babytree.com",
                    "initialProtocol": "http",
                    "initialPort": 80,
                    "stripQuerystring": false,
                    "allowQueryParams": [],
                    "fetchConditions": [],
                    "domainWhiteList": ["*"],
                    "filterByDomain": true
                },
                "urls": ["http://www.babytree.com/community/discuz_ajax.php?action=get_newsfeed_list&type=elite&ts=0&bool=false"]
            },
            "result": "${'urls':$}"
        }, {
            "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
            "title": "把存储的url放入queue",
            "jsonata": ["$.urls{'items':[$]}"],
            "data": {
                "key": "bbtree.names"
            }
        }],
    "msgFlow": [{
            "partten": "role:crawler.plugin.transform,cmd:single",
            "title": "数据整理，返回result1",
            "jsonata": ["$.{'data':$}"],
            "data": {
                "expression": "$.{'queueItem':$}"
            },
            "result": "$.result"
        }, {
            "partten": "role:crawler.plugin.downloader,cmd:interfaces",
            "jsonata": ["$.{'params':$qs($.queueItem.query)}"],
            "data": {
                "url": "http://www.babytree.com",
                "path": "/community/discuz_ajax.php",
                "method": "get"
            },
            "title": "下载页面",
            "result": "${'interInfo':$jparse($.responseBody)}"
        }, {
            "partten": "role:crawler.plugin.transform,cmd:single",
            "title": "数据整理，返回result",
            "jsonata": ["$.{'data':$.interInfo}"],
            "data": {
                "expression": "$.{'last_ts':$.start_last_response_ts}"
            },
            "result": "$.result"
        }, {
            "partten": "role:crawler.plugin.transform,cmd:single",
            "title": "数据整理，返回result",
            "jsonata": ["$.{'data':$.interInfo}"],
            "data": {
                "expression": "$.{'queueItem':{'responseBody':$.data}}"
            },
            "result": "$.result"
        }, {
            "partten": "role:crawler.plugin.html,cmd:html",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "result": "$combine($.result[]){'result':$}",
            "title": "分析人名数据",
            "data": {
                "pages": [{
                        "key": "qa-detail",
                        "path": "*",
                        "areas": [],
                        "fieldKey": "",
                        "fields": {
                            "none": {
                                "data": [{
                                        "key": "names",
                                        "title": "人名列表",
                                        "selector": [".group-updates-list .list-user a"],
                                        "data": [{
                                                "methodInfo": { "text": [] },
                                                "formats": [{ "key": "trim", "settings": { "start": true, "end": true, "middle": true } }],
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
            "partten": "role:crawler.plugin.queue,cmd:queue",
            "title": "把地址queue化",
            "jsonata": ["$.{'urls':['http://www.babytree.com/community/discuz_ajax.php?action=get_newsfeed_list&type=elite&ts='& $.last_ts &'&bool=false']}"],
            "data": {
                "queueConfig": {
                    "ignoreWWWDomain": true,
                    "stripWWWDomain": false,
                    "scanSubdomains": false,
                    "host": "www.babytree.com",
                    "initialProtocol": "http",
                    "initialPort": 80,
                    "stripQuerystring": false,
                    "allowQueryParams": [],
                    "fetchConditions": [],
                    "domainWhiteList": ["*"],
                    "filterByDomain": true
                }
            },
            "result": "${'nextQueueItem':$[0]}"
        }, {
            "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
            "title": "把存储的url放入queue",
            "jsonata": ["$.{'items':[$.nextQueueItem]}"],
            "data": {
                "key": "bbtree.names"
            }
        }, {
            "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
            "title": "把存储的url放入queue",
            "jsonata": ["$.{'items':[$.result]}"],
            "data": {
                "key": "bbtree.names",
                "routingKey": "crawler.url.bbtree.names.data"
            }
        }]
};
//# sourceMappingURL=bbtree.names.js.map