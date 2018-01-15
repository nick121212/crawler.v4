# 爬虫存储模块

> 当前支持的模式

1. 保存爬取的链接；

* 从es中拉取需要保存的链接的信息；
* 如果已经存在，则不再爬取；
* 如果不存在，则保存进入es；
* 返回当前保存的urls；

partten: role:crawler.plugin.store.es,cmd:saveUrls

返回的数据格式：

``` json

{
    "type":"array",
    "items":{
        "type":"object"
    }
}

```

参数的数据格式：

``` json

{
    "type":"object",
    "properties":{
        "urls":{
            "type":"array",
            "items":{
                "type":"object"
            }
        },
        "esIndex":{
            "type":"string"
        },
        "esType":{
            "type":"string"
        }
    }
}

```

2. 存储一份数据

partten: role:crawler.plugin.store.es,cmd:saveResult

返回的数据格式：

``` json

{
    "type":"object"
}

```

参数的数据格式：

``` json

{
    "type":"object",
    "properties":{
        "result":{
            "type":"object",
            "title":"需要存储的数据"
        },
        "_id":{
            "type":"string",
            "title":"id的值，可不指定"
        },
        "esIndex":{
            "type":"string",
            "title":"index"
        },
        "esType":{
            "type":"string",
            "title":"type"
        }
    }
}

```
