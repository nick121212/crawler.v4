# 爬虫链接模块

用于发现html文档中的地址链接

> 当前支持的模式

1. 分析页面

partten: **role:crawler.plugin.queue,cmd:analyze**

返回数据结构:

```
    {
        "type":"array",
        "description":"返回的数据结构",
        "items":{
            "type":"object",
            "properties":{
                "url":{"type":"string","title":"下载链接的详细地址"},
                "path":{"type":"string","title":"下载链接的路径"},
                "query":{"type":"string","title":"下载链接的地址栏参数信息"},
                "protocol":{"type":"string","title":"下载链接的协议"},
                "port":{"type":"number","title":"下载链接的端口"},
                "hostname":{"type":"string","title":"下载链接的域名",
                "depth":{"type":"number","title":"下载链接深度"}, 
            }
        }
    }
```

参数数据结构: 

```
    {
        "type":"object",
        "description":"参数",
        "required":["queueItem"],
        "properties":{
            "discoverConfig":{
                "type":"object",
                "description":"地址过滤配置",
                "properties":{
                    "parseHTMLComments":{"type":"boolean","title":"是否查找注释中的地址"},
                    "parseScriptTags":{"type":"boolean","title":"是否查找script标签中的地址"},
                    "ignoreRobots":{"type":"boolean","title":"是否忽略机器人应答"},
                    "maxDepth":{"type":"number","title":"最大深度"},
                    "fetchWhitelistedMimeTypesBelowMaxDepth":{"type":"boolean","title":"是否开启最大深度过滤"},
                    "whitePathList":{"type":"array","title":"路径白名单","items":{
                        "type":"object"
                        "title":"单个路径规则",
                        "properties":{
                            "path":{
                                "type":"string",
                                "title":"规则，支持正则"
                            },
                            "enable":{
                                "type":"boolean",
                                "title":"是否开启"
                            }
                        }
                    }},
                    "allowedProtocols":{"type":"array","title":"支持的协议","items":{"type":"string"}}
                }
            },
            "queueConfig":{
                "type":"object",
                "description":"域名过滤配置",
                "properties":{
                    "ignoreWWWDomain":{"type":"boolean","title":"忽略www的域名"},
                    "stripWWWDomain":{"type":"boolean","title":"是否去掉www域名，使用根域名"},
                    "scanSubdomains":{"type":"boolean","title":"搜索子域名"},
                    "host":{"type":"string","title":"初始host"},
                    "initialProtocol":{"type":"string","title":"初始协议"},
                    "initialPort":{"type":"number","title":"初始端口",
                    "stripQuerystring":{"type":"boolean","title":"去掉地址栏后面的query参数"},
                    "allowQueryParams":{"type":"array","title":"过滤query参数，选择需要的","items":{"type":"string","title":"单个参数"}},
                    "domainWhiteList":{"type":"array","title":"域名白名单，支持正则","items":{"type":"string","title":"单个域名规则"}},
                    "filterByDomain":{"type":"boolean","title":"是否开启过滤域名白名单"}
                }
            },
            "queueItem":{
                "type":"object",
                "description":"下载的页面的链接信息",
                "required":["url","responseBody"],
                "properties":{
                    "url":{"type":"string","title":"下载链接的详细地址"},
                    "path":{"type":"string","title":"下载链接的路径"},
                    "query":{"type":"string","title":"下载链接的地址栏参数信息"},
                    "protocol":{"type":"string","title":"下载链接的协议"},
                    "port":{"type":"number","title":"下载链接的端口"},
                    "hostname":{"type":"string","title":"下载链接的域名",
                    "depth":{"type":"number","title":"下载链接深度"},
                    "responseBody":{"type":"string","title":"html文档"}
                }
            }
        }
    }
```

测试数据

```
    {
        "queueConfig": {
            "ignoreWWWDomain": false,
            "stripWWWDomain": false,
            "scanSubdomains": true,
            "host": "www.yaolan.com",
            "initialProtocol": "http",
            "initialPort": 80,
            "stripQuerystring": true,
            "fetchConditions": [],
            "domainWhiteList": ["(.*?).yaolan.com"],
            "filterByDomain": true
        },
        "discoverConfig": {
            "parseHTMLComments": false,
            "parseScriptTags": false,
            "allowedProtocols": ["http", "https"],
            "whitePathList": [{ "path": "/(.*?)", "enable": true }],
            "userAgent": "",
            "fetchWhitelistedMimeTypesBelowMaxDepth": false,
            "maxDepth": 0,
            "ignoreRobots": true
        },
        "queueItem": {
            responseBody: "摇篮网首页的html代码",
            url: "http://www.yaolan.com"
        }
    }
```

2. 链接规范化

partten: **role:crawler.plugin.queue,cmd:queue**

返回数据结构:

```
    {
        "type":"array",
        "description":"返回的数据结构",
        "items":{
            "type":"object",
            "properties":{
                "url":{"type":"string","title":"下载链接的详细地址"},
                "path":{"type":"string","title":"下载链接的路径"},
                "query":{"type":"string","title":"下载链接的地址栏参数信息"},
                "protocol":{"type":"string","title":"下载链接的协议"},
                "port":{"type":"number","title":"下载链接的端口"},
                "hostname":{"type":"string","title":"下载链接的域名",
                "depth":{"type":"number","title":"下载链接深度"}, 
            }
        }
    }
```

参数数据结构: 

```
    {
        "type":"object",
        "description":"参数",
        "required":["queueItem"],
        "properties":{
            "queueConfig":{
                "type":"object",
                "description":"域名过滤配置",
                "properties":{
                    "ignoreWWWDomain":{"type":"boolean","title":"忽略www的域名"},
                    "stripWWWDomain":{"type":"boolean","title":"是否去掉www域名，使用根域名"},
                    "scanSubdomains":{"type":"boolean","title":"搜索子域名"},
                    "host":{"type":"string","title":"初始host"},
                    "initialProtocol":{"type":"string","title":"初始协议"},
                    "initialPort":{"type":"number","title":"初始端口",
                    "stripQuerystring":{"type":"boolean","title":"去掉地址栏后面的query参数"},
                    "allowQueryParams":{"type":"array","title":"过滤query参数，选择需要的","items":{"type":"string","title":"单个参数"}},
                    "domainWhiteList":{"type":"array","title":"域名白名单，支持正则","items":{"type":"string","title":"单个域名规则"}},
                    "filterByDomain":{"type":"boolean","title":"是否开启过滤域名白名单"}
                }
            },
            "urls":{
                "type":"array",
                "description":"下载的页面的链接信息",
                "items":{
                    "type":"string",
                    "title":"链接"
                }
            }
        }
    }
```

测试数据

```
    {
        "queueConfig": {
            "ignoreWWWDomain": false,
            "stripWWWDomain": false,
            "scanSubdomains": true,
            "host": "www.yaolan.com",
            "initialProtocol": "http",
            "initialPort": 80,
            "stripQuerystring": true,
            "fetchConditions": [],
            "domainWhiteList": ["(.*?).yaolan.com"],
            "filterByDomain": true
        },
        "urls": ["http://www.yaolan.com","http://bbs.yaolan.com"]
    }
```