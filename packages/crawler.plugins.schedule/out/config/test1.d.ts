declare const _default: {
    key: string;
    initPlugins: ({
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
                "fetchConditions": never[];
                "domainWhiteList": string[];
                "filterByDomain": boolean;
            };
            "urls": string[];
        };
        "result": string;
    } | {
        "key": string;
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
    msgPlugins: ({
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "save": boolean;
        };
        "result": string;
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "pages": {
                "key": string;
                "path": string;
                "enabled": number;
                "fields": {
                    "none": {
                        "data": ({
                            "key": string;
                            "dealStrategy": string;
                            "selector": string[];
                            "methodInfo": {
                                "text": never[];
                            };
                        } | {
                            "key": string;
                            "selector": string[];
                            "dealStrategy": string;
                            "data": ({
                                "key": string;
                                "selector": never[];
                                "dealStrategy": string;
                                "methodInfo": {
                                    "attr": string[];
                                };
                            } | {
                                "key": string;
                                "selector": string[];
                                "dealStrategy": string;
                                "methodInfo": {
                                    "text": never[];
                                };
                            } | {
                                "key": string;
                                "selector": string[];
                                "dealStrategy": string;
                                "methodInfo": {
                                    "text": never[];
                                };
                                "formats": ({
                                    "key": string;
                                    "settings": {
                                        "regexp": string;
                                        "index": number;
                                    };
                                } | {
                                    "key": string;
                                })[];
                            })[];
                        })[];
                    };
                };
            }[];
        };
        "result": string;
    } | {
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
    } | {
        "partten": string;
        "title": string;
        "jsonata": string[];
        "data": {
            "esIndex": string;
            "esType": string;
        };
    })[];
};
export default _default;
