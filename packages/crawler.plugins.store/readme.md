# 爬虫存储插件

> 当前支持的模式

1. 保存爬取的链接；

*  从es中拉取需要保存的链接的信息；
* 如果已经存在，则不再爬取；
* 如果不存在，则保存进入es；
* 返回当前保存的urls；

partten: **role:crawler.plugin.store.es,cmd:saveUrls**


