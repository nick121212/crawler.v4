import * as Seneca from "seneca";
import inversify, { injectable, inject } from "inversify";
import { Plugin, Add, Validate } from "crawler.plugins.common";
import * as Joi from "joi";

import { pluginName } from "../constants";
import { jsonata } from "../index";

@Plugin(pluginName)
@injectable()
export class TransformExexutePlugin {
    /**
     * 启动一个任务
     * @param param0 数据
     */
    @Add(`role:${pluginName},cmd:single`)

    private async single(
        @Validate(Joi.object().keys({
            expression: Joi.string().required().label("表达式"),
            data: Joi.any().required().label("数组字段")
        }), { allowUnknown: true }) { expression, data }: { expression: string, data: any }) {

        let exp = jsonata(expression);
        let res = exp.evaluate(data);

        console.log(res);
        return {
            result: res
        };
    }
    /**
     * 启动一个任务
     * @param param0 数据
     */
    @Add(`role:${pluginName},cmd:muti`)
    private async muti( @Validate(Joi.object().keys({
        expressions: Joi.array().items(Joi.string().required().label("表达式")).required().label("表达式列表"),
        data: Joi.any().required().label("数组字段")
    }), { allowUnknown: true }) { expressions, data }: { expressions: Array<string>, data: any }, options?: any, globalOptions?: any) {
        let rets: Array<any> = [];

        expressions.forEach(async (expression: string) => {
            rets.push((await this.single({ expression, data })).result);
        });

        return { result: rets };
    }
}
