import React from "react";
import { SchemaForm, hocFactory, defaultTheme } from "fx-schema-form-antd";
import Ajv, { Thenable, ValidateFunction, SchemaValidateFunction } from "ajv";
import { Button, Popover, Popconfirm } from "antd";

import templates from "./templates";
import widgets from "./widgets";
import schemas from "./schemas";
import fields from "./fields";
import { ItemButtons, ItemChildButtons } from "../component/item";

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
for (let key in fields) {
    if (fields.hasOwnProperty(key)) {
        defaultTheme.fieldFactory.add(key, fields[key]);
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

console.log(ItemChildButtons, ItemButtons);

const globalOptions = {
    "ui:temp": ["formItem"],
    "boolean": {
        "widget": "switch"
    },
    "hoc": {
        "array": {
            "ItemChildButtons": ItemChildButtons,
            "ItemButtons": ItemButtons
        }
    },
    "formItem": {
        "hasFeedback": false,
        "labelCol": {
            "xs": { "span": 24 },
            "sm": { "span": 6 },
        },
        "wrapperCol": {
            "xs": { "span": 24 },
            "sm": { "span": 16 },
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
