declare const _default: {
    "key": string;
    "prefech": number;
    "initFlow": never[];
    "pages": ({
        "path": string;
        "title": string;
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
                    "areas": never[];
                    "fieldKey": string;
                    "fields": {
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
                                "formats": {
                                    "key": string;
                                    "settings": {
                                        "start": boolean;
                                        "middle": boolean;
                                        "end": boolean;
                                    };
                                }[];
                            } | {
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
                                    "text": never[];
                                };
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
        } | {
            "partten": string;
            "jsonata": string[];
            "data": {
                "url": string;
                "path": string;
                "method": string;
            };
        })[];
    } | {
        "path": string;
        "title": string;
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
        } | {
            "partten": string;
            "jsonata": string[];
            "data": {
                "url": string;
                "path": string;
                "method": string;
            };
        })[];
    })[];
};
export default _default;
