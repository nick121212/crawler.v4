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


> 具体的模块请查看packages下各个模块的文档

> Note 下面是一份爬取微博实时的配置，作为参考

可以使用postman来测试：

地址：http://123.59.43.166:3001/act POST
