# 爬虫下载模块

用于调用接口返回数据

> 下载策略

1. （request） nodejs中http请求的模块。
2. （phantomjs）未实现。

> 当前支持的模式

1. 调用页面

partten: **role:crawler.plugin.downloader,cmd:html**

测试地址：http://172.16.112.215:9001/act POST

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
            "crawlerCount":{
                "title":"当前页面爬取的次数",
                "type":"number"
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
            }
        }
    }
```

测试数据

``` 
    {
        role:"crawler.plugin.downloader",
        cmd:"html",
        queueItem: { 
            url: "http://www.baidu.com" 
        }
    }
```

2. 调用接口

partten: **role:crawler.plugin.downloader,cmd:interface**

测试地址：http://172.16.112.215:9001/act POST

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
                "title":"接口数据字符串",
                "type":"string"
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
            "header":{"type":"object","title":"请求头部"}
        }
    }
```

测试数据

```
{
    role:"crawler.plugin.downloader",
    cmd:"interface",
    url: "http://47.92.126.120:9200",
    path:"/index/_analyze",
    method: "get",
    params: {
        text: "中华人民共和国MN",
        tokenizer: "ik_smart"
    }
}
```