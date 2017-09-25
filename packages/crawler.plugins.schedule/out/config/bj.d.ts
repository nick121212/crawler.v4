declare const _default: {
    "key": string;
    "title": string;
    "purge": boolean;
    "delay": number;
    "prefech": number;
    "startPartten": string;
    "initFlow": never[];
    "pages": {
        "path": string;
        "title": string;
        "msgFlow": ({
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
                        "detail": {
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
            "result": string;
            "retry": number;
            "title": string;
            "data": {
                "url": string;
                "path": string;
                "method": string;
            };
        } | {
            "partten": string;
            "force": boolean;
            "title": string;
            "data": {
                "key": string;
            };
            "result": string;
        } | {
            "partten": string;
            "jsonata": string[];
            "force": boolean;
            "title": string;
            "data": {
                "url": string;
                "path": string;
                "method": string;
            };
        })[];
    }[];
};
export default _default;
