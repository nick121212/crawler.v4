export default {
    "key": "lait.tv.result",
    "title": "爬取到的文章导入到lait.tv",
    "purge": false,
    "delay": 10000,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
    "msgFlow": [{
        "partten": "role:crawler.plugin.downloader,cmd:interface",
        "title": "导入到mysql",
        "jsonata": ["$.{'data':$$}"],
        "data": {
            "url": "http://www.lait.tv",
            "path": "/posts/import",
            "method": "post"
        },
        "result": "${'queueItem':$}"
    }, {
        "partten": "role:crawler.plugin.store.es,cmd:saveResult",
        "title": "导入到es",
        "jsonata": ["$.{'result':$$}"],
        "data": {
            "esIndex": "lait.tv",
            "esType": "posts"
        },
        "result": "${'queueItem':$}"
    }]
};
