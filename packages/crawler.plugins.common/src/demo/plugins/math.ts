


import { injectable, inject } from "inversify";
import * as Seneca from 'seneca';
import * as bluebird from 'bluebird';

import { Plugin, Add, Wrap, Init, PluginBase, Validate } from "../../index";
import { aaa } from "../aaa";
import * as joi from 'joi';

@Plugin("math-plugin", {})
@injectable()
export class MathPlugin extends PluginBase {
    constructor( @inject(aaa) private aa: aaa) {
        super();
    }

    @Init()
    init(msg: any): Promise<any> {
        return new Promise(async (resolve: (value?: any | PromiseLike<any>) => void, reject: (reason?: any) => void) => {
            await bluebird.delay(2000);

            resolve();
        });
    }

    @Wrap("role:math")
    wrap( @Validate(joi.object().keys({
        add: joi.number().integer().min(0).max(100),
    }), { allowUnknown: false }) msg: any) {

        if (!msg.ddd) {
            msg.ddd = 10;
        }

        // console.log(this.aa.aaaa.length);
    }

    @Add("role:math,cmd:add")
    add(msg: any): { data: number } {
        this.aa.aaaa.push("234234");
        return { data: msg.left + msg.right };
    }

    @Add("role:math,cmd:remove")
    async remove(msg: any): Promise<{ data: number }> {
        this.aa.aaaa.push("234234");

        if (!msg.ddd) {
            throw new Error("缺少参数！");
        }

        return { data: msg.left - msg.right + msg.ddd };
    }
}

// <Route path="/a/b" contet={atartet} >