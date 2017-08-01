import 'reflect-metadata';
import { injectable, inject } from 'inversify';
import { Seneca } from 'crawler.plugins.common';

import { container } from './container';

const pluginName = "crawler.plugin.downloader";
const config = {
	"queueItem": {
		url: "http://www.yaolan.com",
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