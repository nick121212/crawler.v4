import * as _ from 'lodash';
import * as moment from 'moment';

/**
 * 处理html文本策越
 */
export class Strategy {
    /**
     * 转换成日期类型
     * @param reseult {Any}
     * @returns {String}
     */
    doDeal(result: string, settings: { format: string }): string {
        let res = moment(_.trim(result), settings.format || 'YYYY-MM-DD');

        if (res.isValid()) {
            return res.format(settings.format || "YYYY-MM-DD");
        }

        return "1990-01-01";
    }
}
export default new Strategy();