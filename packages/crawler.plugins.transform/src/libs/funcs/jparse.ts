import { injectable } from "inversify";
import * as jsonata from "jsonata";

@injectable()
export class JparseFunc {
    public init(exp: jsonata.Expression) {
        exp.assign("jparse", this.combine);
    }

    private combine(objs: string) {
        if (objs.constructor !== String) {
            throw new Error("第一个参数有问题");
        }

        return JSON.parse(objs);
    }
}
