export default {
    "key": "bijia",
    "title": "比价配置文件",
    "prefech": 10,
    "initFlow": [],
    "pages": [{
        "path": "/(\\d+).html",
        "title": "京东详情页配置",
        "msgFlow": [{
            "partten": "role:crawler.plugin.downloader,cmd:html",
            "title": "下载页面",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
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
            "partten": "role:crawler.plugin.transform,cmd:single",
            "title": "数据整理，返回result",
            "jsonata": ["$.{'data':$.queueItem}"],
            "data": {
                "expression": "$.{'pdt_sku':$.pdt_sku,'show_price':$.show_price,'business_id':$.business_id,'business_sku_url':$.business_sku_url}"
            },
            "result": "$"
        }, {
            "partten": "role:crawler.plugin.html,cmd:html",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "result": "$combine($.result[]){'result':$}",
            "data": {
                "pages": [{
                    "key": "qa-detail",
                    "path": "/(\\d+).html",
                    "areas": [{
                        "key": "detail",
                        "selector": [".itemInfo-wrap"]
                    }],
                    "fieldKey": "",
                    "fields": {
                        "detail": {
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
                                "selector": ["#choose-attr-1 .item.selected"],
                                "removeSelector": [],
                                "methodInfo": { "attr": ["data-value"] },
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
            "partten": "role:crawler.plugin.downloader,cmd:interfaces",
            "jsonata": ["$.result.{'params':{'fields':$.$string()}}"],
            "condition": "$.$not()",
            "data": {
                "url": "http://10.11.29.196:8020",
                "path": "/d-api/reptile/businessInfo",
                "method": "get"
            }
        }]
    }, {
        "path": "/item.htm",
        "title": "天猫详情页配置",
        "msgFlow": [{
            "partten": "role:crawler.plugin.downloader,cmd:html",
            "title": "下载页面",
            "retry": 3,
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "data": {
                "save": false,
                "charset": "gbk",
                "engine": "phantom",
                "header": {
                    "Host": "detail.tmall.com",
                    "Accept-Encoding": "gzip, deflate"
                }
            },
            "result": "${'queueItem':$}"
        }, {
            "partten": "role:crawler.plugin.transform,cmd:single",
            "title": "数据整理，返回result",
            "jsonata": ["$.{'data':$.queueItem}"],
            "data": {
                "expression": "$.{'pdt_sku':$.pdt_sku,'show_price':$.show_price,'business_id':$.business_id,'business_sku_url':$.business_sku_url}"
            },
            "result": "$"
        }, {
            "partten": "role:crawler.plugin.html,cmd:html",
            "jsonata": ["$.queueItem.{'queueItem':$}"],
            "title": "解析页面",
            "result": "$combine($.result[]){'result':$}",
            "data": {
                "pages": [{
                    "key": "tm-detail",
                    "path": "*",
                    "areas": [{
                        "key": "detail",
                        "selector": ["#J_DetailMeta"]
                    }],
                    "fieldKey": "",
                    "fields": {
                        "detail": {
                            "data": [{
                                "key": "business_sku_title",
                                "title": "友商商品主标题",
                                "selector": [".tb-detail-hd h1"],
                                "removeSelector": [],
                                "methodInfo": { "text": [] },
                                "htmlStrategy": "jsdom",
                                "dealStrategy": "normal",
                                "formats": [{ "key": "trim", "settings": { "start": true, "middle": true, "end": true } }]
                            }, {
                                "key": "business_sku_subtitle",
                                "title": "友商商品副标题",
                                "selector": [".tb-detail-hd p"],
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
                                "key": "business_standard",
                                "title": "友商商品规格",
                                "selector": ["#choose-attr-1 .item.selected"],
                                "removeSelector": [],
                                "methodInfo": { "attr": ["data-value"] },
                                "dealStrategy": "normal"
                            }, {
                                "key": "business_price",
                                "title": "友商商品销售价格",
                                "selector": [".tm-promo-price .tm-price"],
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
            "partten": "role:crawler.plugin.downloader,cmd:interfaces",
            "jsonata": ["$.result.{'params':{'fields':$.$string()}}"],
            "title": "调用顺利接口",
            "condition": "$.$not()",
            "data": {
                "url": "http://10.11.29.196:8020",
                "path": "/d-api/reptile/businessInfo",
                "method": "get"
            }
        }]
    }]
};
