declare const _default: {
    "key": string;
    "title": string;
    "purge": boolean;
    "delay": number;
    "prefech": number;
    "startPartten": string;
    "pages": ({
        "path": string;
        "title": string;
        "msgFlow": ({
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
                                "methodInfo": {
                                    "text": never[];
                                };
                                "selector": string[];
                                "removeSelector": never[];
                                "dealStrategy": string;
                            } | {
                                "key": string;
                                "methodInfo": {
                                    "html": never[];
                                };
                                "selector": string[];
                                "removeSelector": never[];
                                "dealStrategy": string;
                            } | {
                                "key": string;
                                "methodInfo": {
                                    "text": never[];
                                };
                                "selector": string[];
                                "removeSelector": never[];
                                "formats": {
                                    "key": string;
                                    "settings": {
                                        "regexp": string;
                                    };
                                }[];
                                "dealStrategy": string;
                            })[];
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
                "esIndex": string;
                "esType": string;
            };
        })[];
    } | {
        "path": string;
        "title": string;
        "msgFlow": ({
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
                                "dealStrategy": string;
                                "data": {
                                    "methodInfo": {
                                        "text": never[];
                                    };
                                    "htmlStrategy": string;
                                    "dealStrategy": string;
                                }[];
                            } | {
                                "key": string;
                                "selector": string[];
                                "removeSelector": never[];
                                "dealStrategy": string;
                                "data": ({
                                    "key": string;
                                    "methodInfo": {
                                        "attr": string[];
                                    };
                                    "htmlStrategy": string;
                                    "dealStrategy": string;
                                } | {
                                    "key": string;
                                    "methodInfo": {
                                        "text": never[];
                                    };
                                    "htmlStrategy": string;
                                    "dealStrategy": string;
                                })[];
                            })[];
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
                "esIndex": string;
                "esType": string;
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
    })[];
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
};
export default _default;
