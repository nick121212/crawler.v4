import * as uri from "urijs";

export interface IQueueItem {
    uriPath?: string;
    depth: number;
    port?: number;
    protocol?: string;
    host?: string;
    url?: string;
    query?: string;
    path?: string;
    _id?: string;
    stateData?: any;
}