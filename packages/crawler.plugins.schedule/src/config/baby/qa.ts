export default {
    "key": "qa",
    "title": "qa的配置",
    "purge": true,
    "delay": 5000,
    "prefech": 1,
    "startPartten": "role:crawler.plugin.plugin,cmd:startNormalFlow",
    "initFlow": [],
    "msgFlow": [{
        "partten": "role:crawler.plugin.wp,cmd:qa",
        "title": "调用保存qa的wp插件",
        "force": true,
        "jsonata": ["$.hit"],
        "data": {}
    }]
};
