import { injectable } from 'inversify';
import * as jsonata from 'jsonata';

@injectable()
export class CombineFunc {
    constructor() {

    }

    init(exp: jsonata.IExpression) {
        exp.assign('combine', this.combine);
    }

    combine(objs: Array<Object>) {
        if (objs.constructor !== Array) {
            throw new Error("第一个参数有问题");
        }

        return objs.reduce((prev: Object, obj: Object) => {
            return Object.assign({}, prev, obj);
        }, {});
    }
}