export default {
    "key": "bijia",
    "title": "比价配置文件",
    "purge": false,
    "delay": 500,
    "prefech": 3,
    "initFlow": [{
        "partten": "role:crawler.plugin.queue,cmd:queue",
        "title": "把jd地址queue化",
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
            },
            "urls": [
                "https://item.jd.com/11657619021.html",
                "https://item.jd.com/11687540653.html",
                "https://item.jd.com/11679537105.html",
                "https://item.jd.com/11700010499.html",
                "https://item.jd.com/11753731301.html",
                "https://item.jd.com/11664624878.html",
                "https://item.jd.com/11990711587.html",
                "https://item.jd.com/11731975308.html",
                "https://item.jd.com/11691620731.html",
                "https://item.jd.com/11678427942.html",
                "https://item.jd.com/12191738924.html",
                "https://item.jd.com/12191019621.html",
                "https://item.jd.com/12190522708.html",
                "https://item.jd.com/11744575833.html",
                "https://item.jd.com/11744886363.html",
                "https://item.jd.com/11659266286.html",
                "https://item.jd.com/11758200269.html",
                "https://item.jd.com/12190737570.html",
                "https://item.jd.com/11744261136.html",
                "https://item.jd.com/11659068604.html",
                "https://item.jd.com/10382086485.html",
                "https://item.jd.com/10264414914.html",
                "https://item.jd.com/10265839962.html",
                "https://item.jd.com/10393836374.html",
                "https://item.jd.com/10323042644.html",
                "https://item.jd.com/10265772978.html",
                "https://item.jd.com/10265826661.html",
                "https://item.jd.com/10571151934.html",
                "https://item.jd.com/10798722193.html",
                "https://item.jd.com/1499313323.html",
                "https://item.jd.com/10402839754.html",
                "https://item.jd.com/10265124716.html",
                "https://item.jd.com/1686183910.html",
                "https://item.jd.com/1587171954.html",
                "https://item.jd.com/10105181203.html",
                "https://item.jd.com/1586911222.html",
                "https://item.jd.com/13122195156.html",
                "https://item.jd.com/10991697671.html",
                "https://item.jd.com/10602802402.html",
                "https://item.jd.com/12877393493.html",
                "https://item.jd.com/13190976331.html",
                "https://item.jd.com/13042862941.html",
                "https://item.jd.com/10623936235.html",
                "https://item.jd.com/10846970732.html",
                "https://item.jd.com/10592181964.html",
                "https://item.jd.com/13894982375.html",
                "https://item.jd.com/1792049186.html",
                "https://item.jd.com/13890305433.html",
                "https://item.jd.com/1492378082.html",
                "https://item.jd.com/1590417774.html",
                "https://item.jd.com/13890127241.html"
            ]
        },
        "result": "${'queues':$}"
    }, {
        "partten": "role:crawler.plugin.queue,cmd:queue",
        "title": "把tm地址queue化",
        "data": {
            "queueConfig": {
                "ignoreWWWDomain": true,
                "stripWWWDomain": false,
                "scanSubdomains": false,
                "host": "detail.tmall.com",
                "initialProtocol": "https",
                "initialPort": 80,
                "stripQuerystring": false,
                "allowQueryParams": [],
                "fetchConditions": [],
                "domainWhiteList": ["detail.tmall.com"],
                "filterByDomain": true
            },
            "urls": [
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379801",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379798",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379800",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379799",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379802",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615068",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615062",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615055",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615061",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615060",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615067",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615059",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615057",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615069",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615063",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615066",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379801",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379798",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379800",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379799",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379802",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615068",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615062",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615055",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615061",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615060",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615067",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615059",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615057",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615069",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615063",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615066",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379801",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379798",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379800",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379799",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3496872379802",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615068",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615062",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615055",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615061",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615060",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615067",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615059",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615057",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615069",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615063",
                "https://detail.tmall.com/item.htm?spm=a230r.1.14.14.76bf5236pW3bR&id=543068382566&cm_id=140105335569ed55e27b&abbucket=8&skuId=3430563615066"
            ]
        },
        "result": "${'queues1':$}"
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把存储的url放入queue",
        "jsonata": ["$.{'items':$append($map($.queues,function($v,$k,$i){ {'queueItem':$v} }),$map($.queues1,function($v,$k,$i){ {'queueItem':$v} }))}"],
        "data": {
            "key": "bijia"
        }
    }],
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
