import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Seneca } from 'crawler.plugins.common';
import * as request from 'request-promise';

import * as request1 from 'superagent';


import { container } from './container';

const pluginName = "crawler.plugin.downloader";
const config = {
	"queueItem": {
		url: "http://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/",
		path: "/"
	}
};

const HOST = process.env.HOST || process.argv[2] || "0.0.0.0";
const BASES = (process.env.BASES || process.argv[3] || '').split(',');
const PORT = process.env.PORT;
const BROADCAST = process.env.BROADCAST;
const REGISTRY = JSON.parse(process.env.REGISTRY || '{"active":true}');

let seneca = new Seneca(container, {
	tag: pluginName
});

seneca.initPlugin();
seneca.seneca
	.ready(async () => {
		console.log("ready");
		seneca.seneca.act(`role:${pluginName},cmd:html`, config, (err: Error, res: any) => {
			console.log(res);
		});
	});




// request1.get("https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/").end(console.log)

// request("https://search.jd.com/search?keyword=%E6%B2%99%E5%8F%91&enc=utf-8&ev=exbrand_%E8%8A%9D%E5%8D%8E%E4%BB%95%EF%BC%88CHEERS%EF%BC%89/", {
// 	method: "get",
// 	resolveWithFullResponse: true,
// 	rejectUnauthorized: false,
// 	port: 443,
// 	// headers: {
// 	// 	Host: "search.jd.com",
// 	// 	Referrer:"",
// 	// 	Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
// 	// 	"Accept-Language": "zh-CN,zh;q=0.8,en;q=0.6"
// 	// },
// 	// agentOptions: {
// 	// 	secureProtocol: 'SSLv3_method'
// 	// },
// 	userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
// 	timeout: 5000
// }, undefined).then((res) => {
// 	console.log(res, /1999.00/i.test(res.body));
// });