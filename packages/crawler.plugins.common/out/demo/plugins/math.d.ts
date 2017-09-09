import { PluginBase } from "../../index";
import { aaa } from "../aaa";
export declare class MathPlugin extends PluginBase {
    private aa;
    constructor(aa: aaa);
    init(msg: any): Promise<any>;
    wrap(msg: any): void;
    add(msg: any): {
        data: number;
    };
    remove(msg: any): Promise<{
        data: number;
    }>;
}
