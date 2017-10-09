/// <reference types="jsonata" />
import * as jsonata from "jsonata";
export declare class QsFunc {
    init(exp: jsonata.Expression): void;
    private urlparse(objs, key?);
}
