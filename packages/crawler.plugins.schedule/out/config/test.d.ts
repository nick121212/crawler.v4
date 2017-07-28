declare const _default: {
    "key": string;
    "initUrls": string[];
    "donePlugins": {
        "crawler.result.plugin.babytree": {
            "cmd": string;
            "role": string;
        };
    };
    "plugins": ({
        "key": string;
        "pattern": {
            "role": string;
            "cmd": string;
        };
    } | {
        "key": string;
        "pattern": {
            "role": string;
            "cmd": string;
        };
        "resultPath": string;
        "config": {
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
            "discoverConfig": {
                "parseHTMLComments": boolean;
                "parseScriptTags": boolean;
                "allowedProtocols": string[];
                "whitePathList": {
                    "path": string;
                    "enable": boolean;
                }[];
                "userAgent": string;
                "fetchWhitelistedMimeTypesBelowMaxDepth": boolean;
                "maxDepth": number;
                "ignoreRobots": boolean;
            };
        };
    } | {
        "key": string;
        "pattern": {
            "role": string;
            "cmd": string;
        };
        "resultPath": string;
        "config": {
            "pages": ({
                "key": string;
                "path": string;
                "areas": never[];
                "fieldKey": string;
                "fields": {
                    "none": {
                        "data": ({
                            "key": string;
                            "selector": string[];
                            "removeSelector": string[];
                            "methodInfo": {
                                "text": never[];
                            };
                            "htmlStrategy": string;
                            "dealStrategy": string;
                        } | {
                            "key": string;
                            "selector": string[];
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
                                    "text": never[];
                                };
                                "formats": {
                                    "key": string;
                                }[];
                            })[];
                        })[];
                    };
                };
                "enabled": boolean;
            } | {
                "key": string;
                "path": string;
                "areas": never[];
                "fieldKey": string;
                "fields": {
                    "none": {
                        "data": {
                            "key": string;
                            "selector": string[];
                            "methodInfo": {
                                "html": never[];
                            };
                            "formats": never[];
                        }[];
                    };
                };
                "enabled": boolean;
            })[];
        };
    })[];
};
export default _default;
