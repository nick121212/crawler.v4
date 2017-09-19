declare const _default: {
    "parttern": string;
    "config": {
        "data": {
            "pdt_sku": string;
            "business_id": number;
            "business_sku_url": string;
        };
        "msgFlow": ({
            "key": string;
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
                "save": boolean;
                "charset": string;
                "engine": string;
                "header": {
                    "Host": string;
                    "Accept-Encoding": string;
                };
            };
            "result": string;
        } | {
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
            "result": string;
            "data": {
                "pages": {
                    "key": string;
                    "path": string;
                    "areas": {
                        "key": string;
                        "selector": string[];
                    }[];
                    "fieldKey": string;
                    "fields": {
                        "title": {
                            "data": {
                                "key": string;
                                "title": string;
                                "selector": string[];
                                "removeSelector": never[];
                                "methodInfo": {
                                    "text": never[];
                                };
                                "htmlStrategy": string;
                                "dealStrategy": string;
                                "formats": {
                                    "key": string;
                                    "settings": {
                                        "start": boolean;
                                        "middle": boolean;
                                        "end": boolean;
                                    };
                                }[];
                            }[];
                        };
                        "none": {
                            "data": ({
                                "key": string;
                                "title": string;
                                "selector": string[];
                                "removeSelector": never[];
                                "methodInfo": {
                                    "text": never[];
                                };
                                "htmlStrategy": string;
                                "dealStrategy": string;
                            } | {
                                "key": string;
                                "title": string;
                                "selector": string[];
                                "removeSelector": never[];
                                "methodInfo": {
                                    "attr": string[];
                                };
                                "dealStrategy": string;
                            } | {
                                "key": string;
                                "title": string;
                                "selector": string[];
                                "methodInfo": {
                                    "text": never[];
                                };
                                "htmlStrategy": string;
                                "dealStrategy": string;
                            })[];
                        };
                    };
                    "enabled": boolean;
                }[];
            };
        })[];
    };
};
export default _default;
