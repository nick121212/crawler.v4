export default {
    "key": "qa",
    "title": "qa的配置",
    "purge": true,
    "delay": 500,
    "prefech": 3,
    "startPartten": "role:crawler.plugin.plugin,cmd:testFlow",
    "initFlow": [],
    "msgFlow": [{
        "partten": "role:crawler.plugin.store.es,cmd:scroll",
        "title": "开始循环遍历es",
        "jsonata": ["$.{'scrollId':$.scrollId}"],
        "data": {
            "esIndex": "qa",
            "esType": "mamilove",
        },
        "result": "${'scroll':$}"
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把存储的数据放入queue",
        "jsonata": ["$.{'items':$map($.scroll.hits.hits,function($v,$k,$i){ {'hit':$v} })}"],
        "data": {
            "key": "qa"
        }
    }, {
        "partten": "role:crawler.plugin.task,cmd:addItemToQueue",
        "title": "把存储的数据放入queue",
        "jsonata": ["$.{'items':['scrollId':$.scroll._scroll_id]}"],
        "data": {
            "key": "scroll-qa"
        }
    }]
};
