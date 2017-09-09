import * as jsonata from 'jsonata';
export declare class MomentFunc {
    constructor();
    init(exp: jsonata.IExpression): void;
    moment(...args: Array<any>): any;
}
