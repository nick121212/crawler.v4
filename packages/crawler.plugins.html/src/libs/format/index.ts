import * as requireDir from 'require-directory';
import * as _ from "lodash";

export class FormatStrategy {
    private formats: any = {};

    constructor() {
        _.each(requireDir(module, "./"), (format: any, key: string) => {
            this.formats[key] = format.default;
        });
    }

    /**
     * 开始处理文本
     * @param result      {Any}    数据
     * @param config      {Object} 配置
     * @returns Any
     */
    doDeal(key: string, result: any, settings: any = {}) {
        let strategy = this.formats[key];

        if (!strategy) {
            return result;
        }

        try {
            return strategy.doDeal(result, settings);
        } catch (e) {
            return result;
        }
    }
}

export default new FormatStrategy();