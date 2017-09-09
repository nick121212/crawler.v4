import * as jsonata from "jsonata";

import { container } from "../container";
import { Types } from "../constants";

export default (str: string) => {
    let exp: jsonata.Expression = jsonata(str);
    let funcs = container.getAll(Types.FUNC);

    funcs.forEach((func: any) => {
        func.init(exp);
    });

    return exp;
};
