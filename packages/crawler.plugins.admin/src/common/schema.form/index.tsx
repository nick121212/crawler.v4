import React from "react";
import { SchemaForm, hocFactory, defaultTheme } from "fx-schema-form-antd";
import Ajv, { Thenable, ValidateFunction, SchemaValidateFunction } from "ajv";
import { Button, Popover, Popconfirm } from "antd";

import templates from "./templates";
import widgets from "./widgets";
import schemas from "./schemas";

for (let key in widgets) {
    if (widgets.hasOwnProperty(key)) {
        defaultTheme.widgetFactory.add(key, widgets[key]);
    }
}

for (let key in templates) {
    if (templates.hasOwnProperty(key)) {
        defaultTheme.tempFactory.add(key, templates[key]);
    }
}

const curAjv = new Ajv({
    allErrors: true,
    jsonPointers: true,
    useDefaults: true,
    $data: true,
    errorDataPath: "property"
});

const schemaFormOptions = {
    ajv: curAjv
};

const globalOptions = {
    "ui:temp": ["formItem"],
    "boolean": {
        "widget": "switch"
    },
    "hoc": {
        "array": {
            createItemButtons: (props: any) => {
                const { isShow = true } = props.meta;
                return (
                    <div>
                        <Button style={{ marginRight: 5 }} type="primary" shape="circle" icon="plus" ghost={true}
                            onClick={() => { props.addItem(); }}></Button>
                        <Button type={!isShow ? "dashed" : "primary"}
                            shape="circle" icon={isShow ? "shrink" : "arrows-alt"}
                            onClick={() => { props.toggleItem(); }}></Button>
                    </div>
                );
            },
            createItemChildButtons: (props: any, idx: number, maxLength: number) => {
                return (
                    <Popover placement="topLeft" title={null} content={(
                        <div>
                            <Popconfirm
                                style={{ marginRight: 5 }}
                                title="Are you sure？"
                                onConfirm={() => {
                                    props.removeItem(idx);
                                }}
                                okText="Yes"
                                cancelText="No">
                                <Button ghost={true} type="danger" shape="circle" icon="delete"></Button>
                            </Popconfirm>
                            <Button style={{ marginRight: 5 }} ghost={false} type="dashed" shape="circle" icon="packup"
                                onClick={() => { props.switchItem(idx, idx - 1); }}></Button>
                            <Button ghost={false} type="dashed" shape="circle" icon="unfold"
                                onClick={() => { props.switchItem(idx, idx + 1); }}></Button>
                        </div>
                    )} trigger="hover">
                        <Button icon="switch" shape="circle"></Button>
                    </Popover>
                );
            }
        }
    },
    "formItem": {
        "hasFeedback": true,
        "labelCol": {
            "xs": { "span": 24 },
            "sm": { "span": 3 },
        },
        "wrapperCol": {
            "xs": { "span": 24 },
            "sm": { "span": 19 },
        }
    },
    "row": {
        "type": "flex"
    },
    "col": {
        "xs": { "span": 24, "offset": 0 },
        "sm": { "span": 20, "offset": 2 },
    },
    "card": {
        "noHovering": true,
        "bordered": false
    },
    "object": {
        "ui:temp": ["card"]
    },
    "array": {
        "ui:temp": ["row", "col", "card"]
    }
};

for (let key in schemas) {
    if (schemas.hasOwnProperty(key)) {
        curAjv.addSchema(schemas[key]);
    }
}

export {
    curAjv as ajv,
    schemaFormOptions,
    globalOptions
};
