# 爬虫调度模块

> 当前支持的模式

1. 找到当前queueItem对应的规则配置

partten: role:crawler.plugin.plugin,cmd:getFieldFlow

返回数据结构:

``` json
    {
        "type":"object",
        "description":"返回的数据结构"
    }
```

参数数据结构:

``` json
    {
        "type":"object",
        "$id":"msgFlow",
        "description":"参数数据结构",
        "items":{
            "type":"object",
            "properties":{
                "queueItem":{"type":"object","title":"queue化的地址"},
                "pages":{
                    "type":"array",
                    "title":"定义的page规则",
                    "items":{
                        "type":"object",
                        "properties":{
                            "path":{
                                "type":"string",
                                "title":"地址的规则"
                            },
                            "title":{
                                "type":"string",
                                "title":"说明文字"
                            },
                            "msgFlow":{
                                "type":"array",
                                "title":"爬取流",
                                "items":{
                                    "type":"object",
                                    "required":["key","partten"],
                                    "properties":{
                                        "key": {"type":"string","title":"唯一值"},
                                        "partten": {"type":"string","title":"调用的模式"},
                                        "title": {"type":"string","title":"插件显示的名称"},
                                        "jsonata":  {"type":"array","items":{"type":"string"},"title":"动态参数，变换数据结构，合并数据到data字段"},
                                        "data":  {"type":"any","title":"调用partten所需要的参数"},
                                        "result": {"type":"string","title":"返回的数据处理"},
                                        "retry":  {"type":"number","title":"失败重试次数"},
                                        "timeout": {"type":"number","title":"partten调用超时时间"},
                                        "condition": {"type":"string","title":"调用条件，如果条件不满足，则不调用"},
                                        "force": {"type":"boolean","title":"是否强制忽略错误"}
                                    }
                                }
                            }
                        }
                    }
                },
            }
        }
    }
```

2. 调用一个普通流

partten: role:crawler.plugin.plugin,cmd:startNormalFlow

返回数据结构:

``` json
    {
        "type":"object",
        "description":"返回的数据结构"
    }
```

参数数据结构:

``` json
    {
        "type":"object",
        "description":"参数数据结构",
        "items":{
            "type":"object",
            "properties":{
                "title":{"type":"string","title":"说明文字"},
                "prefech":{"type":"number","title":"并发数"},
                "delay":{"type":"number","title":"延时时长"},
                "data":{"type":"object","title":"所需的参数，根据不同的msgFlow调整"},
                "msgFlow":{
                    "$ref":"msgFlow#/properties/msgFlow"
                }
            }
        }
    }
```

2. 调用一个普通流，用于但个站点不同页面的情况

partten: role:crawler.plugin.plugin,cmd:startFlow

返回数据结构:

``` json
    {
        "type":"object",
        "description":"返回的数据结构"
    }
```

参数数据结构:

``` json
{
    "type":"object",
    "description":"参数数据结构",
    "properties":{
        "title":{"type":"string","title":"说明文字"},
        "prefech":{"type":"number","title":"并发数"},
        "delay":{"type":"number","title":"延时时长"},
        "initFlow":{
                "$ref":"msgFlow#/properties/msgFlow",
                "title":"初始化队列，第一次会执行"
        },
        "pages":{
            "type":"object",
            "properties":{
                "path":{
                    "type":"string",
                    "title":"页面的地址规则"
                },
                "title":{"type":"string","title":"说明文字"},
                "msgFlow":{
                    "type":"array",
                    "items":{
                        "$ref":"msgFlow#/properties/msgFlow",
                    }
                }
            }
        }
    }
}
```

4. 获取一个queueService实例

partten: role:crawler.plugin.task,cmd:getOne

返回数据结构:

``` json
    {
        "type":"object",
        "description":"返回的数据结构"
    }
```

参数数据结构:

``` json
    {
        "type":"object",
        "description":"参数数据结构",
        "properties":{
            "key":{"type":"string","title":"唯一值"}
        }
    }
```

5. 数据入到Queue

partten: role:crawler.plugin.task,cmd:addItemToQueue

返回数据结构: null

参数数据结构:

``` json
    {
        "type":"object",
        "description":"参数数据结构",
        "required":["key","items"],
        "properties":{
            "key":{"type":"string","title":"唯一值"},
            "routingKey":{"type":"string","title":"路由,用于指定mq"},
            "items":{"type":"array","items":{"type":"any"}}
        }
    }
```

6. 启动一个任务,根据不同的startPartten开决定参数

partten: role:crawler.plugin.task,cmd:add

返回数据结构: null

参数数据结构:

``` json
    {
        "type":"object",
        "description":"参数数据结构",
        "properties":{
            "title":{"type":"string","title":"说明文字"},
            "prefech":{"type":"number","title":"并发数"},
            "delay":{"type":"number","title":"延时时长"},
            "startPartten":{"type":"string","title":"队列的执行流"},
            "initFlow":{
                "$ref":"msgFlow#/properties/msgFlow",
                "title":"初始化队列，第一次会执行"
            },
            "msgFlow":{
                "$ref":"msgFlow#/properties/msgFlow",
                "title":"初始化队列，第一次会执行"
            },
            "pages":{
                "type":"array",
                "items":{
                    "type":"object",
                    "properties":{
                        "path":{
                            "type":"string",
                            "title":"页面的地址规则"
                        },
                        "title":{"type":"string","title":"说明文字"},
                        "msgFlow":{
                            "type":"array",
                            "items":{
                                "$ref":"msgFlow#/properties/msgFlow",
                            }
                        }
                    }
                }
            }
        }
    }
```

7. 删除一个任务

partten: role:crawler.plugin.task,cmd:remove

返回数据结构: null

参数数据结构:

``` json
    {
        "type":"object",
        "description":"参数数据结构",
        "properties":{
            "key":{"type":"string","title":"说明文字"},
            "purge":{"type":"boolean","title":"是否清除掉当前未执行完的任务"}
        }
    }
```

8. 列出所有正在执行的任务

partten: role:crawler.plugin.task,cmd:list

返回数据结构: 

``` json
    {
        "type":"array",
        "description":"参数数据结构",
        "items":{
            "type":"object"
        }
    }
```