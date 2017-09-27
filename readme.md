# nodejs爬虫

## nodejs版本

- 8.2.1

## rabbitmq配置

- 10.9.103.241 10-9-103-241  主节点
- 10.9.184.20  10-9-184-20   从节点
- 10.9.122.179 10-9-122-179  从节点

## redis配置

10.9.103.241 10-9-103-241 单台

## 服务配置

> 10.9.103.241

- base
- downloader
- schedule

> 10.9.184.20

- base
- downloader
- queue
- store
- transform
- webapi :3001

> 10.9.122.179

- base
- html
- downloader

## 育儿采集：
1. http://www.99.com.cn/erke/  这部分对应到 医院 医院的挂号和医生推荐 关联问答部分(可付费)
2. http://yuer.ibabyzone.cn/   分类按照这个定义

## 大数据采集：

1. 房源
2. 商铺
3. 装修公司相关

## 搜索：

搜索框那个 未来会细化和强化 ， 医院里叫这个。。。哦 量表系统