export default {
    "key": "bbtree",
    "title": "bbtree爬取人名的配置",
    "purge": false,
    "delay": 200,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [{
        "parttern": "role:crawler.plugin.downloader,cmd:interfaces",
        "data": {
            "url": "http://www.babytree.com",
            "path": "/community/discuz_ajax.php",
            "method": "get",
            "params": {
                "action": "get_newsfeed_list",
                "type": "elite",
                "ts": 0,
                "bool": false
            }
        },
        "title": "下载页面",
        "jsonata": ["$.queueItem.{'queueItem':$}"],
        "result": "${'queueItem':$}"
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
                            "selector": [".group-updates-list .list-user a:eq(0)"],
                            "data": [{
                                "methodInfo": { "text": [] },
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
    }],
    "msgFlow": [{
        "partten": "role:crawler.plugin.wp,cmd:qa",
        "title": "调用保存qa的wp插件",
        "force": true,
        "jsonata": ["$.hit"],
        "data": {}
    }]
};
