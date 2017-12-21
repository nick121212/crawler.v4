import React from "react";
import { SchemaForm, hocFactory, defaultTheme } from "fx-schema-form-react";
import Ajv, { Thenable, ValidateFunction, SchemaValidateFunction } from "ajv";

import templates from "./templates";
import widgets from "./widgets";
import schemas from "./schemas";
import fields from "./fields";
import hocs from "./hocs";
import { ItemButtons, ItemChildButtons } from "../component/item";

defaultTheme.fieldFactory.unLock("array");
// defaultTheme.fieldFactory.("array");


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
        defaultTheme.fieldFactory.add(key, fields[key], true);
    }
}

for (let key in hocs) {
    if (hocs.hasOwnProperty(key)) {
        hocFactory.add(key, hocs[key]);
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
        "ui:temp": ["card"]
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
