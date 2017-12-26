import * as seneca from "seneca";
import * as bluebird from "bluebird";
import { injectable } from "inversify";
import * as bluebire from "bluebird";
import * as Kue from "kue";

const KueSchedule = require("kue-scheduler");

/**
 * agenda服务
 */
@injectable()
export class KueService {
    public queue: any;

    /**
     * 构造函数
     * @param configFactory 配置文件服务类
     */
    constructor(config: any) {
        this.queue = KueSchedule.createQueue({
            prefix: 'q',
            jobEvents: true,
            ...config
        });
       
        this.queue.inactive((err:any,ids:number[])=>{
            console.log(ids);
        });

        this.queue.enableExpiryNotifications();
        // this.queue.clear();
        this.queue.on("restore error", (error: Error) => {
            console.log(error);
        }).on("scheduler unknown job expiry key", (err: Error) => {
            console.log(err);
        });

        KueSchedule.app.listen(3000);
    }
}