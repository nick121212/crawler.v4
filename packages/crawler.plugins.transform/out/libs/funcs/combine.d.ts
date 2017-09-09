import * as jsonata from 'jsonata';
export declare class CombineFunc {
    constructor();
    init(exp: jsonata.IExpression): void;
    combine(objs: Array<Object>): Object;
}
