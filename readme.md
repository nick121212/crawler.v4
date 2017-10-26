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



公众号爬取：
1. https://mp.weixin.qq.com/s?timestamp=1508222095&src=3&ver=1&signature=PYeO7oF-l30yBxqCGSe3NeVStTO6DXvAQhvm1BJZ9Q8ZN1hSjaN6Cikt3j-GD52XijrCTB7xRTyX8dlluK1VThyfwrCh1S1gUgVbBPX5NLv7YV8lVNs4ybXqAhvbLPxZUSoy-ARm3pxgOAttFhmTlZRz9ziimcC6lOOCWMjXPCQ=
2. https://mp.weixin.qq.com/profile?src=3&timestamp=1508222224&ver=1&signature=rrc2r53IvijONLr0AkcI1mRHAqQD*rWVHc0fjaiNhCsxhTpCnWa-yLSW16Y7-VrrOcs6TJrB0cHUzwGG*oObrw==

大众点评爬取：
1. 美食
2. 景点
3. 酒店