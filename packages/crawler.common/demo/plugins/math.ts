


import { injectable, inject } from "inversify";
import * as Seneca from 'seneca';
import * as bluebird from 'bluebird';

import { Plugin, Add, Wrap, Init } from "../../src/index";
import { aaa } from "../aaa";

@Plugin("math-plugin", {})
@injectable()
export class MathPlugin {
    constructor( @inject(aaa) private aa: aaa) {

    }

    @Init()
    init(a: any, b: any, c: any): Promise<any> {
        return new Promise(async (resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => {
            await bluebird.delay(2000);

            console.log("math:init", this.aa, c);

            resolve();
        });
    }

    @Wrap("role:math")
    wrap(msg: any) {
        if (!msg.ddd) {
            msg.ddd = 10;
        }
    }

    @Add("role:math,cmd:add")
    add(msg: any): { data: number } {
        return { data: msg.left + msg.right };
    }

    @Add("role:math,cmd:remove")
    async remove(msg: any): Promise<{ data: number }> {

        if (!msg.ddd) {
            throw new Error("缺少参数！");
        }

        return { data: msg.left - msg.right + msg.ddd };
    }
}