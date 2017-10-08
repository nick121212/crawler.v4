export default {
    "key": "youlai",
    "title": "有来网的配置",
    "purge": false,
    "delay": 300,
    "prefech": 10,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
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
            "esIndex": "youlai",
            "esType": "url"
        },
        "result": "${'saveUrls':$}"
    }, {
        "partten": `role:crawler.plugin.task,cmd:addItemToQueue`,
        "title": "把存储的url放入queue",
        "jsonata": ["$.saveUrls{'items':[$]}"],
        "data": {
            "key": "youlai",
        }
    }],
    "msgFlow": [{
        "partten": "role:crawler.plugin.wp,cmd:qa",
        "title": "调用保存qa的wp插件",
        "force": true,
        "jsonata": ["$.hit"],
        "data": {}
    }]
};
