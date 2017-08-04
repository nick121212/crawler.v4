import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Seneca } from 'crawler.plugins.common';

import { container } from './container';

let seneca = new Seneca(container, {
    tag: "crawler.plugin.downloader"
});

seneca.seneca
    .ready(async () => {
        seneca.seneca.act("role:crawler.plugin.downloader,cmd:html", {
            "queueItem": {
                "protocol": "https",
                "host": "item.jd.com",
                "query": "",
                "port": 80,
                "path": "/10468590470.html",
                "depth": 2,
                "url": "https://item.jd.com/10468590470.html",
                "_id": "14ca64908864d9a0fbc173eed901b289"
            },
            "engine": "superagent",
            "charset": "gbk",
            "header": {
                // ":authority": "item.jd.com",
                // ":method": "GET",
                // ":path": "/10468590470.html",
                // ":scheme": "https",
                // "content-type":"text/html; charset=gbk"
            }
        }, console.log);
        console.log("crawler.plugins.downloader plugin ready!");
    });

