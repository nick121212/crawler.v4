import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Seneca } from 'crawler.plugins.common';

import { container } from './container';
import { pluginMqName, pluginTaskName } from './constants';

// import config from './config/test';

let seneca = new Seneca(container, {
    tag: "crawler.plugins.schedule"
});

seneca.seneca
    .ready(async () => {
        console.log("ready");
        await seneca.seneca.actAsync(`role:${pluginTaskName},cmd:add`, {
            config: { key: "testplugin" },
            plugins: [{
                "partten": "role:crawler.plugin.queue,cmd:queue",
                "data": {
                    "queueConfig": {
                        "ignoreWWWDomain": false,
                        "stripWWWDomain": false,
                        "scanSubdomains": true,
                        "host": "www.jd.com",
                        "initialProtocol": "https",
                        "initialPort": 80,
                        "stripQuerystring": false,
                        "fetchConditions": [],
                        "domainWhiteList": ["(.*?).jd.com"],
                        "filterByDomain": true
                    },
                    "urls": ["https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/"]
                }
            }, {
                "partten": "role:crawler.plugin.downloader,cmd:html",
                "data": {
                    "queueItem": {
                        "protocol": "https",
                        "url": "https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89%2F",
                        "_id": "1fea1c20adb1fe1da0675a061b6d2c8d"

                    }
                }
            }, {
                "partten": "role:crawler.plugin.html,cmd:html",
                "data": {
                    "pages": [{
                        "key": "brandlist",
                        "path": "*",
                        "enabled": 1,
                        "fields": {
                            "none": {
                                "data": [{
                                    "key": "totalPage",
                                    "dealStrategy": "normal",
                                    "selector": [
                                        "#J_topPage .fp-text i"
                                    ],
                                    "methodInfo": {
                                        "text": []
                                    }
                                },
                                {
                                    "key": "skus",
                                    "selector": ["#J_goodsList ul:eq(0) > li"],
                                    "dealStrategy": "array",
                                    "data": [{
                                        "key": "sku",
                                        "selector": [],
                                        "dealStrategy": "normal",
                                        "methodInfo": {
                                            "attr": ["data-sku"]
                                        }
                                    },
                                    {
                                        "key": "price",
                                        "selector": [".p-price i"],
                                        "dealStrategy": "normal",
                                        "methodInfo": {
                                            "text": []
                                        }
                                    },
                                    {
                                        "key": "comment",
                                        "selector": [".p-commit strong a"],
                                        "dealStrategy": "normal",
                                        "methodInfo": {
                                            "text": []
                                        },
                                        "formats": [{
                                            "key": "regexp",
                                            "settings": {
                                                "regexp": "/\\d+/",
                                                "index": 0
                                            }
                                        }, {
                                            "key": "num"
                                        }]
                                    }
                                    ]
                                }
                                ]
                            }
                        }
                    }],
                    "queueItem": {
                        "url": "https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89%2F",
                        "_id": "1fea1c20adb1fe1da0675a061b6d2c8d"
                    }
                }
            }]
        });

        // seneca.seneca.act(`role:${pluginName},cmd:add`, { config: config });
        // setInterval(async () => {
        //     console.log(seneca.seneca.has("role:crawler.plugin.downloader,cmd:html"));
        //     // await seneca.seneca.actAsync(`role:${pluginName},cmd:remove`, { config: config });
        //     // await bluebird.delay(5000);
        // }, 5000);
    });

