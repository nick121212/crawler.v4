import { injectable } from "inversify";
import * as jsonata from "jsonata";
import * as qs from "qs";

@injectable()
export class JparseFunc {
    public init(exp: jsonata.Expression) {
        exp.assign("qs", this.urlparse);
    }

    private urlparse(objs: string, key?: string) {
        if (!objs || objs.constructor !== String) {
            throw new Error("第一个参数有问题");
        }

        let noSparse = qs.parse(objs);

        if (key) {
            return noSparse[key];
        }

        return noSparse;
    }
}
