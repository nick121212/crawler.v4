declare const _default: {
    "key": string;
    "title": string;
    "purge": boolean;
    "delay": number;
    "prefech": number;
    "startPartten": string;
    "initFlow": never[];
    "msgFlow": ({
        "partten": string;
        "title": string;
        "jsonata": string[];
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
        };
    })[];
};
export default _default;
