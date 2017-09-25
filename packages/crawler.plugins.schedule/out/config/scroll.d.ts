declare const _default: {
    "key": string;
    "title": string;
    "purge": boolean;
    "delay": number;
    "prefech": number;
    "startPartten": string;
    "initFlow": ({
        "partten": string;
        "title": string;
        "data": {
            "esIndex": string;
            "esType": string;
        };
        "result": string;
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "key": string;
            "routingKey": string;
        };
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "key": string;
        };
    })[];
    "msgFlow": ({
        "partten": string;
        "title": string;
        "data": {
            "esIndex": string;
            "esType": string;
        };
        "result": string;
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "key": string;
            "routingKey": string;
        };
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "key": string;
        };
    })[];
};
export default _default;
