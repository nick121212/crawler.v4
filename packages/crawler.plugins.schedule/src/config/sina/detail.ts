export default {
    "key": "weiboRealDetail",
    "title": "weibo real详情页的配置",
    "purge": true,
    "delay": 100,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
    "msgFlow": [{
        "partten": "role:crawler.plugin.transform,cmd:single",
        "jsonata": ["${'data':$$}"],
        "data": {
            "expression": "$.{'result':$$}"
        },
        "result": "$.result"
    }, {
        "partten": "role:crawler.plugin.transform,cmd:single",
        "jsonata": ["${'data':$$.originUrl}"],
        "data": {
            "expression": "$.{'originUrl':'https://weibo.com/a/hot/' & $$ }"
        },
        "result": "$.result"
    }, {
        "partten": "role:crawler.plugin.queue,cmd:queue",
        "title": "把地址queue化",
        "jsonata": ["$.{'urls':[$$.originUrl]}"],
        "data": {
            "queueConfig": {
                "ignoreWWWDomain": true,
                "stripWWWDomain": false,
                "scanSubdomains": false,
                "host": "weibo.com",
                "initialProtocol": "https",
                "initialPort": 443,
                "stripQuerystring": false,
                "allowQueryParams": [],
                "fetchConditions": [],
                "domainWhiteList": ["*"],
                "filterByDomain": true
            }
        },
        "result": "${'queueItem':$[0]}"
    }, {
        "partten": "role:crawler.plugin.downloader,cmd:html",
        "title": "下载页面",
        "jsonata": ["$.queueItem.{'queueItem':$}"],
        "data": {
            "save": false,
            "engine": "superagent",
            "header": {
                "Cookie": "SINAGLOBAL=5696355488967.68.1507530624020; login_sid_t=aa1be78805f068b2f235d06995c369cf; cross_origin_proto=SSL; TC-Ugrow-G0=e66b2e50a7e7f417f6cc12eec600f517; TC-V5-G0=28bf4f11899208be3dc10225cf7ad3c6; _s_tentry=www.baidu.com; Apache=5110163293823.075.1513760506791; ULV=1513760507858:3:1:1:5110163293823.075.1513760506791:1508908606743; YF-Ugrow-G0=ea90f703b7694b74b62d38420b5273df; YF-V5-G0=731b77772529a1f49eac82a9d2c2957f; UOR=cn.ui.vmall.com,widget.weibo.com,www.xuanfengge.com; SCF=AgzkBXn-zKd_brpNqgTNv9BaWRVRI64FqUYn2UZraXJcYxR4KKR6SKWJQ8VNoZkmCDrwGlJCjQ76qx18EwIa-Rs.; SUB=_2A253RzooDeRhGeVO7loZ8CfJwz2IHXVUNSzgrDV8PUJbktANLUenkW9NTW6QgHP6MRd8ZjDgOUx_Nhl3McEgHuPJ; SUBP=0033WrSXqPxfM725Ws9jqgMF55529P9D9WWzd1hBsENs4xYODekC-x4Y5JpX5K2hUgL.Foe7SKnReh.f1h22dJLoI7yVIgSuUGLfIBtt; SUHB=0idbI-aXAuOZ8g"
            }
        },
        "result": "${'queueItem':$}"
    }, {
        "partten": "role:crawler.plugin.html,cmd:html",
        "jsonata": ["$.queueItem.{'queueItem':$}"],
        "result": "${'result':$combine($.result[])}",
        "data": {
            "pages": [{
                "key": "detail",
                "path": "*",
                "areas": [],
                "fields": {
                    "none": {
                        "data": [{
                            "key": "content",
                            "title": "文章详情内容",
                            "selector": ["#pl_unlogin_home_focuspic .list_des"],
                            "methodInfo": { "html": [] },
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "normal",
                            "formats": [{ "key": "trim", "settings": { "start": true, "middle": true, "end": true } }]
                        }, {
                            "key": "originUrl",
                            "title": "文章详情中的所有图片",
                            "selector": ["#pl_unlogin_home_focuspic .list_nod"],
                            "methodInfo": { "attr": ["href"] },
                            "htmlStrategy": "jsdom",
                            "dealStrategy": "normal"

                        }]
                    }
                },
                "enabled": true
            }]
        }
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把解析到的数据存入到mq中",
        "jsonata": ["$.{'items':[$.result]}"],
        "data": {
            "key": "weiboRealDetail",
            "routingKey": "crawler.url.weiboRealDetail1	"
        }
    }]
};
