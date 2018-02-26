export default {
    "key": "scroll-youlai",
    "title": "qa的配置",
    "purge": true,
    "delay": 500,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [{
        "partten": "role:crawler.plugin.store.es,cmd:scroll",
        "title": "init--开始循环遍历es",
        "data": {
            "esIndex": "youlai",
            "esType": "article"
        },
        "result": "${'scroll':$}"
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把存储的数据放入queue",
        "jsonata": ["$.{'items':$map($.scroll.hits.hits,function($v,$k,$i){ {'hit':$v} })}"],
        "data": {
            "key": "scroll-youlai",
            "routingKey": "crawler.url.youlai"
        }
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把scrollId的数据放入queue",
        "jsonata": ["$.{'items':[{'scrollId':$.scroll._scroll_id}]}"],
        "data": {
            "key": "scroll-youlai"
        }
    }],
    "msgFlow": [{
        "partten": "role:crawler.plugin.store.es,cmd:scroll",
        "title": "开始循环遍历es",
        "jsonata": ["$.{'scrollId':$.scrollId}"],
        "data": {
            "esIndex": "youlai",
            "esType": "article"
        },
        "result": "${'scroll':$}"
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把存储的数据放入queue",
        "jsonata": ["$.{'items':$map($.scroll.hits.hits,function($v,$k,$i){ {'hit':$v} })}"],
        "data": {
            "key": "scroll-youlai",
            "routingKey": "crawler.url.youlai"
        }
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把scrollId的数据放入queue",
        "jsonata": ["$.{'items':[{'scrollId':$.scroll._scroll_id}]}"],
        "data": {
            "key": "scroll-youlai"
        }
    }]
};
