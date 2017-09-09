import { injectable } from 'inversify';
import * as jsonata from 'jsonata';
import * as moment from 'moment';

@injectable()
export class MomentFunc {
    constructor() { }

    init(exp: jsonata.IExpression) {
        exp.assign('moment', this.moment);
    }

    moment(...args: Array<any>) {
        return moment.apply(this, args);
    }
}