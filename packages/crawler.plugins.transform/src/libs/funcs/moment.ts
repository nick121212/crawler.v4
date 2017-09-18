import { injectable } from "inversify";
import * as jsonata from "jsonata";
import * as moment from "moment";

@injectable()
export class MomentFunc {
    public init(exp: jsonata.Expression) {
        exp.assign("moment", this.moment);
    }

    private moment(...args: Array<any>) {
        return moment.apply(this, args);
    }
}
