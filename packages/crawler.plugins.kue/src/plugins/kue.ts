import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Validate, Init } from "crawler.plugins.common";
import * as Kue from "kue";
import * as bluebird from "bluebird";

import { pluginName } from "../constants";
import { KueService } from "../libs/kue";

@Plugin(pluginName)
@injectable()
export class KuePlugin {
    private kue: KueService;
    /**
     * 启动一个任务
     * @param param0 数据
     */
    @Add(`role:${pluginName},cmd:create`)
    private async muti(config: any, options?: any, globalOptions?: any) {
        let { type, data, removeOnComplete, every, priority, attempts, backoff, unique, ttl, progress } = config;
        let job = this.kue.queue.createJob(type || "seneca-schedule", data)
            .removeOnComplete(removeOnComplete);
        let saveAsync = bluebird.promisify(job.save.bind(job));

        if (unique) {
            job.unique(unique);
        }
        if (priority) {
            job.priority(priority);
        }
        if (attempts) {
            job.attempts(attempts);
        }
        if (backoff) {
            job.backoff(backoff);
        }
        if (ttl) {
            job.ttl(ttl);
        }

        await saveAsync();

        if (every) {
            this.kue.queue.every(every, job);
        }

        return job;
    }

    /**
     * 启动未正常停止的队列
     * @param msg
     * @param options
     * @param globalOptions
     */
    @Init()
    private async init(msg: any, options: any, globalOptions: any) {
        this.kue = new KueService(globalOptions);
        this.kue.queue.on('job enqueue', function (id: number, type: string) {
            console.log('Job %s got queued of type %s', id, type);
        }).on('job complete', (id: number, result: any) => {
            console.log("job completed ", id, result);
        });

        this.kue.queue.process("seneca-schedule", async (job: any, done: Function) => {
            options.seneca.actAsync(job.data.partten, job.data.data);
            done();
        });
    }
}
