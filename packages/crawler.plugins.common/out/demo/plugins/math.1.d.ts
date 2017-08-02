import { PluginBase } from "../../index";
import { aaa } from "../aaa";
export declare class MathPlugin1 extends PluginBase {
    private aa;
    constructor(aa: aaa);
    init(a: any, b: any, c: any): Promise<any>;
    wrap(msg: any): void;
    add(msg: any): {
        data: number;
    };
    remove(msg: any): Promise<{
        data: number;
    }>;
}
