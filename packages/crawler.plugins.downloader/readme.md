# 爬虫下载模块

用于调用接口返回数据

> 下载策略

1. request:nodejs中http请求的模块。
2. phantomjs:载入js，不加载image和css。速度稍慢。
3. superagent:nodejs中http请求的模块。

> 当前支持的模式

1. 调用页面

partten: **role:crawler.plugin.downloader,cmd:html**

返回数据结构:

```
    {
        "type":"object",
        "description":"返回的数据结构",
        "properties":{
            "statusCode":{
                "title":"http的status code",
                "type":"number"
            }，
            "responseBody":{
                "title":"页面的html字符串",
                "type":"string"
            },
            "header":{
                "title":"当前爬取返回的头部信息",
                "type":"object"
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
            "queueItem":{
                "type":"object",
                "description":"下载的页面的链接信息",
                "required":["url"],
                "properties":{
                    "url":{"type":"string","title":"下载链接的详细地址"},
                    "path":{"type":"string","title":"下载链接的路径"},
                    "query":{"type":"string","title":"下载链接的地址栏参数信息"},
                    "protocol":{"type":"string","title":"下载链接的协议"},
                    "port":{"type":"number","title":"下载链接的端口"},
                    "hostname":{"type":"string","title":"下载链接的域名",
                    "depth":{"type":"number","title":"下载链接深度"},
                }
            },
            proxyInfo:{
                type:"string",
                title:"代理信息",
                description:"http://127.0.0.1:8080"
            },
            header:{
                type:"object",
                title:"头信息",
            },
            charset:{
                type:"string",
                default:"utf-8",
                title:"字符集编码"
            },
            engine:{
                type:"string",
                enum:["superagent","request","phantom"],
                title:"引擎"
            }
        }
    }
```

2. 调用接口

partten: **role:crawler.plugin.downloader,cmd:interface**

返回数据结构:

```
    {
        "type":"object",
        "description":"返回的数据结构",
        "properties":{
            "statusCode":{
                "title":"http的status code",
                "type":"number"
            },
            "responseBody":{
                "title":"接口数据字符串",
                "type":"string"
            },
            "header":{
                "title":"当前爬取返回的头部信息",
                "type":"object"
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
            "url":{"type":"string","title":"接口的地址"},
            "path":{"type":"string","title":"接口的路径"},
            "params":{"type":"object","title":"所需的参数"},
            "data":{"type":"string","title":"所需的数据"},
            "method":{"type":"string","title":"请求类型"},
            "header":{"type":"object","title":"请求头部"},
            charset:{
                type:"string",
                default:"utf-8",
                title:"字符集编码"
            },
            engine:{
                type:"string",
                enum:["superagent","request","phantom"],
                title:"引擎"
            }
        }
    }
```
