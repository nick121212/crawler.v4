import React from "react";
import Immutable from "immutable";

import { IModelProxyState } from "../../../common/reducer/proxy";
import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";

export interface ContentProps {
    result?: IModelProxyState<Immutable.Map<string, any>>;
    schemaForm: any;
    execute?: (data: any) => void;
}

const data = {
    blocks: [{
        elements: [{
            span: 3,
            image: "https://www.baidu.com/img/bd_logo1.png"
        }]
    }]
};

export const schemaKey = "design";
export const schema = {
    $async: true,
    type: "object",
    properties: {
        blocks: {
            type: "array",
            title: "块元素集合",
            default: [],
            items: {
                type: "object",
                title: "块元素",
                properties: {
                    elements: {
                        type: "array",
                        title: "元素集合",
                        default: [],
                        items: {
                            type: "object",
                            title: "元素",
                            required: ["image", "span"],
                            default: {},
                            properties: {
                                image: {
                                    type: "string",
                                    default: "http://git.huginn.cn/static/images/huginn_logo.png"
                                },
                                span: {
                                    type: "number",
                                    default: 24,
                                    mininum: 0,
                                    maxinum: 0
                                },
                                offset: {
                                    type: "number",
                                    default: 0
                                },
                                push: {
                                    type: "number",
                                    default: 0
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
export const uiSchema = [{
    key: "blocks",
    items: [{
        title: "容器组件",
        field: "object",
        "ui:temp": ["card"],
        "ui:item.hoc": ["theme", "field", "array", "temp"],
        items: [{
            key: "blocks/-/elements",
            "ui:temp": "grid",
            items: [{
                key: "blocks/-/elements/-",
                title: "纯容器（使用card），包装2个item",
                "ui:temp": [],
                field: "griditem",
                items: [{
                    title: "元素组件",
                    field: "object",
                    "ui:temp": ["card"],
                    "ui:item.hoc": ["theme", "field", "array", "temp"],
                    items: ["*"],
                    options: {
                        card: {
                            bordered: false
                        }
                    }
                }]
            }],
            options: {
                grid: {
                    showButtons: true,
                    title: "元素设置"
                }
            }
        }],
        options: {
            card: {
                bordered: false,
                bodyStyle: {
                    margin: 0,
                    padding: 0
                }
            }
        }
    }]
}];

ajv.addSchema(schema);

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
