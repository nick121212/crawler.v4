# 爬虫html分析模块

用于分析html文档中所需的数据

> 字段的分析策略

1. normal

基础模式;分析单个字段。

事例配置

``` json
    {
        "key": "num",
        "selector": ["#text_Keywords"],
        "dealStrategy": "normal",
        "methodInfo": { "val": [] },
        "formats": [
            { "key": "trim", "settings": { "start": true, "end": true, "mimddle": true } },
            { "key": "regexp", "settings": { "regexp": "/\\d+/", "scope": "i", "index": 0 } },
            { "key": "num" }
        ]
    }
```

2. array

数组模式;可以分析出数组字段。

事例配置

``` json
    {
        "key": "array",
        "selector": ["#ylHnTime li"],
        "dealStrategy": "array",
        "data": [{
            "key": "name",
            "selector": ["a"],
            "methodInfo": { "text": [] },
            "dealStrategy": "normal"
        }]
    }
```

3. switch,case

switch模式;用于解析飘忽不定的字段，必须和case搭配来使用。

事例配置

``` json
{
    "selector": ["#ylHnTime li"],
    "dealStrategy": "switch",
    "data": [{
        "selector": "a",
        "methodInfo": { "attr": ["title"] },
        "match": "0-1岁",
        "data": [{
            "key": "tag",
            "selector": ["a"],
            "formats": [{ "str": [] }],
            "methodInfo": { "text": [] }
        }],
        "dealStrategy": "case"
    }],
}
```

4. object

object模式；解析带数据结构的字段。

实例配置

``` json
{
    "key": "obj",
    "selector": ["#ylNav2"],
    "dealStrategy": "object",
    "data": [{
        "key": "title",
        "selector": ["a.ylHdNavTt"],
        "methodInfo": { "text": [] },
        "dealStrategy": "normal"
    }, {
        "key": "title-1",
        "selector": [".ylHdNavCon a"],
        "dealStrategy": "array",
        "data": [{
            "key": "",
            "selector": [],
            "methodInfo": { "text": [] },
            "dealStrategy": "normal"
        }]
    }]
}
```

5. or

or模式；用于字段有多个不确定的地方可以取值，只命中一个。

实例配置

``` json
{
    "key": "cur-text",
    "dealStrategy": "or",
    "data": [{
        "selector": [".zsTobTabUl .cur a"],
        "methodInfo": { "text": [] },
        "dealStrategy": "normal"
    },{
        "selector": [".key_main .key_ul .hover"],
        "methodInfo": { "text": [] },
        "dealStrategy": "normal"
    }]
}
```

> 字段的format策略

1. date; 转换成标准日期

参数结构

``` json
    {
        "type":"object",
        "properties":{
            "format":{"title":"日期的format格式","type":"string"}
        }
    }
```

返回值类型: string

2. json;转换成json格式

参数结构

``` json
    {
        "type":"object",
        "properties":{
            "parse":{"title":"是否转换","type":"boolean"},
            "func":{"title":"转换方法","type":"string"}
        }
    }
```

返回值类型: object

3. num;转换成数字

参数结构: 无参数

返回值类型: number

4. qs;转换地址栏参数

参数结构

``` json
    {
        "type":"object",
        "properties":{
            "pointer":{"title":"地址栏参数的路径","type":"boolean"},
        }
    }
```

返回值类型: string

5. regexp;通过正则转换数据

参数结构

``` json
    {
        "type":"object",
        "required":["regexp"],
        "properties":{
            "regexp":{"title":"正则规则","type":"string"},
            "scope":{"title":"正则的scope","type":"string"},
            "index":{"title":"正则matchs的索引","type":"number"},
        }
    }
```

返回值类型: string

6. split;通过split分栏转换数组数据

参数结构

``` json
    {
        "type":"object",
        "required":["splitOf","start"],
        "properties":{
            "splitOf":{"title":"分隔符","type":"string"},
            "start":{"title":"起始索引","type":"number"},
            "end":{"title":"结束索引","type":"number"},
            "join":{"title":"转换字符串分隔符","type":"string"},
        }
    }
```

返回值类型: string | Array<any>

7.1 trim;去空格

参数结构

``` json
    {
        "type":"object",
        "properties":{
            "middle":{"title":"中间空格","type":"string"},
            "start":{"title":"起始空格","type":"number"},
            "end":{"title":"结束空格","type":"number"}
        }
    }
```

返回值类型: string

> 当前支持的模式

1. 分析页面

partten: **role:crawler.plugin.html,cmd:html**

测试地址：http://172.16.112.215:9002/act POST

返回数据结构:

``` json
    {
        "type":"array",
        "description":"返回的数据结构",
        "items":{
            "title":"单个result的数据",
            "properties":{
                "rule":{"title":"当前地址所使用的规则","type":"object"},
                "result":{"title":"当前规则解析出来的数据","type":"object"}
            }
        }
    }
```

参数数据结构:

``` json
    {
        "type":"object",
        "description":"参数",
        "required":["queueItem","pages"],
        "definitions": {
            "data": {
                "type":"object",
                "title":"字段配置",
                "properties":{
                    "key":{"title":"字段名","type":"string"},
                    "selector":{
                        "type":"array",
                        "title":"jquery选择器代码",
                        "items":{
                            "type":"string",
                            "title":"字段选择器"
                        }
                    },
                    "removeSelector":{
                        "type":"array",
                        "title":"需要删除的jquery选择器代码",
                        "items":{
                            "type":"string",
                            "title":"字段选择器"
                        }
                    },
                    "methodInfo":{
                        "title":"调用的方法信息",
                        "type":"object"
                    },
                    "htmlStrategy":{
                        "title":"html分析策略",
                        "type":"string"
                    },
                    "dealStrategy":{
                        "title":"字段分析策略"
                    },
                    "match":{
                        "title":"当使用match策略的时候，需要匹配的信息",
                        "type":"string"
                    },
                    "data":{
                        "type":"array",
                        "title":"嵌套的字段",
                        "items":{
                            "$ref":"#/definitions/data"
                        }
                    }
                }
            }
        },
        "properties":{
            "pages":{
                "type":"object",
                "description":"地址过滤配置",
                "required":["key","fields"],
                "properties":{
                    "key":{"type":"string","title":"page的唯一字段"},
                    "path":{"type":"string","title":"当前page对应的链接路径"},
                    "enabled":{"type":"boolean","title":"是否激活状态"},
                    "fields":{
                        "type":"array",
                        "title":"字段配置",
                        "items":{
                            "type":"object",
                            "title":"字段",
                            "properties":{
                                "none":{
                                    "type":"object",
                                    "title":"固定字段",
                                    "properties":{
                                        "data": {
                                            "$ref":"#/definitions/data"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "queueItem":{
                "type":"object",
                "description":"下载的页面的链接信息",
                "required":["url","_id"],
                "properties":{
                    "_id":{"type":"string","title":"链接对应的md5"},
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

``` json
{
    "pages": [{
    "key": "main-123",
        "path": "",
        "areas": [],
        "fieldKey": "",
        "fields": {
            "none": {
                "data": [{
                    "key": "obj",
                    "selector": ["#ylNav2"],
                    "dealStrategy": "object",
                    "data": [{
                        "key": "title",
                        "selector": ["a.ylHdNavTt"],
                        "methodInfo": { "text": [] },
                        "dealStrategy": "normal"
                    }, {
                        "key": "title-1",
                        "selector": [".ylHdNavCon a"],
                        "dealStrategy": "array",
                        "data": [{
                            "key": "",
                            "selector": [],
                            "methodInfo": { "text": [] },
                            "dealStrategy": "normal"
                        }]
                    }]
                }, {
                    "key": "cur-text",
                    "dealStrategy": "or",
                    "data": [{
                        "selector": [".zsTobTabUl .cur a"],
                        "methodInfo": { "text": [] },
                        "dealStrategy": "normal"
                    },{
                        "selector": [".key_main .key_ul .hover"],
                        "methodInfo": { "text": [] },
                        "dealStrategy": "normal"
                    }]
                }]
            }
        },
        "enabled": true
    }, {
        "key": "health-post",
        "path": "/health/d+.shtml",
        "areas": [],
        "fieldKey": "",
        "fields": {
            "none": {
                "data": [{
                    "key": "title",
                    "selector": ["#final_content .sfinal_w:eq(0) h1:eq(0)"],
                    "removeSelector": [],
                    "methodInfo": { "text": [] },
                    "htmlStrategy": "jsdom",
                    "dealStrategy": "normal"
                }, {
                    "key": "content",
                    "selector": ["#content_p"],
                    "removeSelector": [],
                    "methodInfo": { "html": [] },
                    "htmlStrategy": "jsdom",
                    "dealStrategy": "normal"
                }]
            }
        },
        "enabled": true
    }, {
        "key": "main",
        "path": "",
        "areas": [],
        "fieldKey": "",
        "fields": {
            "none": {
                "data": [{
                    "key": "array",
                    "selector": ["#ylHnTime li"],
                    "dealStrategy": "array",
                    "data": [{
                        "key": "name",
                        "selector": ["a"],
                        "methodInfo": { "text": [] },
                        "dealStrategy": "normal"
                    }]
                }, {
                    "selector": ["#ylHnTime li"],
                    "dealStrategy": "switch",
                    "data": [{
                        "selector": "a",
                        "methodInfo": { "attr": ["title"] },
                        "match": "0-1岁",
                        "data": [{
                            "key": "switch",
                            "selector": ["a"],
                            "formats": [{ "str": [] }],
                            "methodInfo": { "text": [] }
                        }],
                        "dealStrategy": "case"
                    }],
                }]
            }
        },
        "enabled": true
    }, {
        "key": "num",
        "path": "",
        "areas": [],
        "fieldKey": "",
        "enabled": true,
        "fields": {
            "none": {
                "data": [{
                    "key": "num",
                    "selector": ["#text_Keywords"],
                    "dealStrategy": "normal",
                    "methodInfo": { "val": [] },
                    "formats": [
                        { "key": "trim", "settings": { "start": true, "end": true, "mimddle": true } },
                        { "key": "regexp", "settings": { "regexp": "/\\d+/", "scope": "i", "index": 0 } },
                        { "key": "num" }
                    ]
                }]
            }
        }
    }],
    "queueItem": {
        "_id": "djlflds3opidu3ur",
        "responseBody": "摇篮网首页的html",
        "url": "http://www.yaolan.com",
        "path": "/"
    }
}
```