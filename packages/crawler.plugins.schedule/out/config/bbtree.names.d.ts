declare const _default: {
    "key": string;
    "title": string;
    "purge": boolean;
    "delay": number;
    "prefech": number;
    "startPartten": string;
    "initFlow": ({
        "key": string;
        "partten": string;
        "title": string;
        "data": {
            "queueConfig": {
                "ignoreWWWDomain": boolean;
                "stripWWWDomain": boolean;
                "scanSubdomains": boolean;
                "host": string;
                "initialProtocol": string;
                "initialPort": number;
                "stripQuerystring": boolean;
                "allowQueryParams": never[];
                "fetchConditions": never[];
                "domainWhiteList": string[];
                "filterByDomain": boolean;
            };
            "urls": string[];
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
    "msgFlow": ({
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "expression": string;
        };
        "result": string;
    } | {
        "partten": string;
        "jsonata": string[];
        "data": {
            "url": string;
            "path": string;
            "method": string;
        };
        "title": string;
        "result": string;
    } | {
        "partten": string;
        "jsonata": string[];
        "result": string;
        "title": string;
        "data": {
            "pages": {
                "key": string;
                "path": string;
                "areas": never[];
                "fieldKey": string;
                "fields": {
                    "none": {
                        "data": {
                            "key": string;
                            "title": string;
                            "selector": string[];
                            "data": {
                                "methodInfo": {
                                    "text": never[];
                                };
                                "formats": {
                                    "key": string;
                                    "settings": {
                                        "start": boolean;
                                        "end": boolean;
                                        "middle": boolean;
                                    };
                                }[];
                                "htmlStrategy": string;
                                "dealStrategy": string;
                            }[];
                            "htmlStrategy": string;
                            "dealStrategy": string;
                        }[];
                    };
                };
                "enabled": boolean;
            }[];
        };
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "queueConfig": {
                "ignoreWWWDomain": boolean;
                "stripWWWDomain": boolean;
                "scanSubdomains": boolean;
                "host": string;
                "initialProtocol": string;
                "initialPort": number;
                "stripQuerystring": boolean;
                "allowQueryParams": never[];
                "fetchConditions": never[];
                "domainWhiteList": string[];
                "filterByDomain": boolean;
            };
        };
        "result": string;
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "key": string;
        };
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "key": string;
            "routingKey": string;
        };
    })[];
};
export default _default;
