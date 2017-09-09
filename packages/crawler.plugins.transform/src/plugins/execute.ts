import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Wrap, Init, Validate } from "crawler.plugins.common";
import * as Joi from "joi";

import { pluginName } from "../constants";
import { jsonata } from "../index";

@Plugin(pluginName)
@injectable()
export class TransformExexutePlugin {
    /**
     * 启动一个任务
     * @param param0 
     * @param options 
     * @param globalOptions 
     */
    @Add(`role:${pluginName},cmd:single`)

    async single(
        @Validate(Joi.object().keys({
            expression: Joi.string().required(),
            data: Joi.any().required()
        }), { allowUnknown: true }) { expression, data }: { expression: string, data: any }, options?: any, globalOptions?: any) {

        let exp = jsonata(expression);

        return {
            result: exp.evaluate(data)
        };
    }
    /**
     * 启动一个任务
     * @param param0 
     * @param options 
     * @param globalOptions 
     */
    @Add(`role:${pluginName},cmd:muti`)
    async muti( @Validate(Joi.object().keys({
        expressions: Joi.array().items(Joi.string().required()).required(),
        data: Joi.any().required()
    }), { allowUnknown: true }) { expressions, data }: { expressions: Array<string>, data: any }, options?: any, globalOptions?: any) {
        let rets: Array<any> = [];

        expressions.forEach(async (expression: string) => {
            rets.push((await this.single({ expression, data }, options, globalOptions)).result);
        });

        return { result: rets };
    }
}