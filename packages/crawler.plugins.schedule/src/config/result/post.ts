export default {
    "key": "lait.tv.result",
    "title": "爬取到的文章导入到lait.tv",
    "purge": false,
    "delay": 2000,
    "prefech": 3,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
    "msgFlow": [{
        "partten": "role:crawler.plugin.downloader,cmd:interfaces",
        "title": "导入到mysql",
        "jsonata": ["$.{'data':$$}"],
        "data": {
            "url": "https://www.lait.tv",
            "path": "/posts/import",
            "method": "post"
        }
    }]
};
