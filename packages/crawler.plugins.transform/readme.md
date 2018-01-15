# 爬虫数据转换模块

Jsonata语法 [戳这里](http://docs.jsonata.org/)

> 当前支持的模式

1. 转换一次数据

partten: role:crawler.plugin.transform,cmd:single

返回的数据格式：

``` json

{
    "type":"object",
    "properties":{
        "result":{
            "type":"any"
        }
    }
}

```

参数的数据格式：

``` json

{
    "type":"object",
    "properties":{
        "expression":{
            "type":"string"
        },
        "data":{
            "type":"any"
        }
    }
}

```

2. 多个数据转换,这里调用多次【single】

partten: role:crawler.plugin.transform,cmd:muti

返回的数据格式：

``` json

{
    "type":"array",
    "items":{
        "type":"object",
        "properties":{
            "result":{
                "type":"any"
            }
        }
    }
}

```

参数的数据格式：

``` json

{
    "type":"object",
    "properties":{
        "expressions":{
            "type":"array",
            "items":{
                "type":"string"
            }
        },
        "data":{
            "type":"any"
        }
    }
}

```
