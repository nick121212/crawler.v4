"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "parttern": "role:crawler.plugin.task,cmd:testFlow",
    "config": {
        "data": {
            "pdt_sku": "11199537356",
            "business_id": 0,
            "business_sku_url": "https://item.jd.com/11199537356.html"
        },
        "msgFlow": [{
                "key": "queue",
                "partten": "role:crawler.plugin.queue,cmd:queue",
                "title": "把地址queue化",
                "jsonata": ["$.queueItem.business_sku_url.{'urls':[$]}"],
                "data": {
                    "queueConfig": {
                        "ignoreWWWDomain": true,
                        "stripWWWDomain": false,
                        "scanSubdomains": false,
                        "host": "item.jd.com",
                        "initialProtocol": "https",
                        "initialPort": 80,
                        "stripQuerystring": false,
                        "allowQueryParams": [],
                        "fetchConditions": [],
                        "domainWhiteList": ["item.jd.com"],
                        "filterByDomain": true
                    }
                },
                "result": "${'queueUrl':$[0]}"
            }, {
                "partten": "role:crawler.plugin.downloader,cmd:html",
                "title": "下载页面",
                "jsonata": ["$.queueUrl.{'queueItem':$}"],
                "data": {
                    "save": false,
                    "charset": "gbk",
                    "engine": "phantom",
                    "header": {
                        "Host": "item.jd.com",
                        "Accept-Encoding": "gzip, deflate"
                    }
                },
                "result": "${'queueItem':$}"
            }, {
                "partten": "role:crawler.plugin.html,cmd:html",
                "title": "分析页面，取出体转数据",
                "jsonata": ["$.queueItem.{'queueItem':$}", "$.queueUrl.{'queueItem':$}"],
                "result": "$combine($.result[]){'result':$}",
                "data": {
                    "pages": [{
                            "key": "qa-detail",
                            "path": "/(\\d+).html",
                            "areas": [],
                            "fieldKey": "",
                            "fields": {
                                "none": {
                                    "data": [{
                                            "key": "business_sku_title",
                                            "title": "友商商品主标题",
                                            "selector": [".sku-name"],
                                            "removeSelector": [],
                                            "methodInfo": { "text": [] },
                                            "htmlStrategy": "jsdom",
                                            "dealStrategy": "normal",
                                            "formats": [{ "key": "trim", "settings": { "start": true, "middle": true, "end": true } }]
                                        }, {
                                            "key": "business_promotion",
                                            "title": "友商商品优惠信息,券",
                                            "selector": [".quan-item .text"],
                                            "removeSelector": [],
                                            "methodInfo": { "text": [] },
                                            "htmlStrategy": "jsdom",
                                            "dealStrategy": "normal"
                                        }, {
                                            "key": "business_sku_subtitle",
                                            "title": "友商商品副标题",
                                            "selector": [".news .item:eq(0)"],
                                            "removeSelector": [],
                                            "methodInfo": { "text": [] },
                                            "dealStrategy": "normal"
                                        }, {
                                            "key": "business_standard",
                                            "title": "友商商品规格",
                                            "selector": [".qa-item-list .qa-item-right-status:eq(0) span:eq(-2) a"],
                                            "removeSelector": [],
                                            "methodInfo": { "text": [] },
                                            "dealStrategy": "normal"
                                        }, {
                                            "key": "business_price",
                                            "title": "友商商品销售价格",
                                            "selector": [".summary-price .p-price .price"],
                                            "methodInfo": { "text": [] },
                                            "htmlStrategy": "jsdom",
                                            "dealStrategy": "normal"
                                        }]
                                }
                            },
                            "enabled": true
                        }]
                }
            }, {
                "partten": "role:crawler.plugin.transform,cmd:single",
                "title": "数据整理",
                "jsonata": ["$.{'data':$.queueItem}"],
                "data": {
                    "expression": "$.{'pdt_sku':$.pdt_sku,'business_id':$.business_id,'business_sku_url':$.business_sku_url}"
                },
                "result": "$"
            }]
    }
};
//# sourceMappingURL=jd.detail.js.map