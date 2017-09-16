declare const _default: {
    "key": string;
    "prefech": number;
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
                "allowQueryParams": string[];
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
    pages: ({
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
            "title": string;
            "jsonata": string[];
            "result": string;
            "data": {
                "timeout$": number;
                "pages": {
                    "key": string;
                    "path": string;
                    "areas": {
                        "key": string;
                        "selector": string[];
                    }[];
                    "fieldKey": string;
                    "fields": {
                        "main": {
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
                "key": string;
                "routingKey": string;
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
                    "allowQueryParams": string[];
                    "fetchConditions": never[];
                    "domainWhiteList": string[];
                    "filterByDomain": boolean;
                };
                "discoverConfig": {
                    "whitePathList": {
                        "path": string;
                        "enable": number;
                    }[];
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
                "esIndex": string;
                "esType": string;
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
        })[];
    })[];
};
export default _default;
