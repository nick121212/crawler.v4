# 爬虫API模块

这里对所有模式做了hub，任何支持的模式都可以再这里调用；暴露3001端口

> 当前支持的模式

1. 调用其他模式

partten: role:crawler.plugin.transform,cmd:single

返回的数据格式：

``` json

{
    "type":"any"
}

```

参数的数据格式：

``` json

{
    "type":"object",
    "properties":{
        "parttern":{
            "type":"string",
            "title":"模式"
        },
        "config":{
            "type":"object",
            "title":"参数配置，针对不同的partten，使用不同的参数"
        }
    }
}

```
