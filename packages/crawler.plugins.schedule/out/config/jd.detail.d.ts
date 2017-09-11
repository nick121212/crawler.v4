declare const _default: {
    "key": string;
    "prefech": number;
    "initFlow": never[];
    "pages": {
        "path": string;
        "title": string;
        "msgFlow": ({
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
                    "allowQueryParams": string[];
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
                "save": boolean;
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
                    "areas": never[];
                    "fieldKey": string;
                    "fields": {
                        "none": {
                            "data": ({
                                "key": string;
                                "selector": string[];
                                "removeSelector": never[];
                                "methodInfo": {
                                    "text": never[];
                                };
                                "htmlStrategy": string;
                                "dealStrategy": string;
                            } | {
                                "key": string;
                                "selector": string[];
                                "removeSelector": string[];
                                "methodInfo": {
                                    "text": never[];
                                };
                                "htmlStrategy": string;
                                "dealStrategy": string;
                                "formats": ({
                                    "key": string;
                                    "settings": {
                                        "regexp": string;
                                        "scope": string;
                                        "index": number;
                                    };
                                } | {
                                    "key": string;
                                })[];
                            } | {
                                "key": string;
                                "selector": string[];
                                "removeSelector": never[];
                                "methodInfo": {
                                    "html": never[];
                                };
                                "dealStrategy": string;
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
                                "htmlStrategy": string;
                                "dealStrategy": string;
                                "data": ({
                                    "key": string;
                                    "selector": string[];
                                    "methodInfo": {
                                        "text": never[];
                                    };
                                    "formats": {
                                        "key": string;
                                        "settings": {
                                            "start": boolean;
                                            "end": boolean;
                                        };
                                    }[];
                                } | {
                                    "key": string;
                                    "selector": string[];
                                    "methodInfo": {
                                        "attr": string[];
                                    };
                                    "formats": {
                                        "key": string;
                                    }[];
                                })[];
                            })[];
                        };
                    };
                    "enabled": boolean;
                }[];
            };
        })[];
    }[];
};
export default _default;
