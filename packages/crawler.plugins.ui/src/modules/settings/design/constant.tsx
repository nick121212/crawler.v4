import React from "react";
import { EditReducer } from "./edit";

export interface DesignProps {
    connectDropTarget?: (Component: any) => any;
    canDrop?: boolean;
    isOver?: boolean;
    $edit?: any;
}

export const editReducer = new EditReducer();

export const globalOptions = {
    "ui:temp": ["formItem"],
    "hoc": {
        "array": {},
        "opt": {
            onClick: (data, props) => {
                let { formItemData, mergeSchema } = props;

                if (data.schema) {
                    editReducer.actions.setCurrentEditForm({
                        schema: data.schema,
                        uiSchema: data.uiSchema,
                        parentKeys: mergeSchema.originKeys,
                        arrayLevel: props.arrayLevel
                    });
                } else {
                    editReducer.actions.setCurrentEditForm({});
                }
            }
        }
    },
    "object": {
        "ui:temp": [],
        "root": ({ children }) => children,
        "ui:item.hoc": ["theme", "field", "validate", "array", "extraField", "target", "opt"]
    },
    "array": {
        "ui:temp": [],
        "ui:item.hoc": ["theme", "field", "validate", "array", "extraField", "target", "opt"]
    },
    "field": {
        "array": {
            "root": ({ children }) => children,
        },
        "tile": {
            "target": ["image", "text"],
            "targetConfig": {
                canDrop(props: any, monitor) {
                    return !props.formItemData.children || props.formItemData.children.length === 0;
                },
            }
        },
        "tileGroup": {
            "target": "tile"
        }
    }
};

export const globalOptions1 = {
    "ui:temp": ["col", "formItem"],
    "hoc": {
        "array": {},
    },
    "object": {
        "ui:temp": ["row"],
        root: ({ children }) => children
        // "ui:temp": [],
        // "ui:item.hoc": ["theme", "field", "validate", "array", "extraField", "target"]
    },
    "array": {
        // "ui:temp": [],
        // "ui:item.hoc": ["theme", "field", "validate", "array", "extraField", "target"]
    }
};

export const initialState = {
    children: [{
        field: "design",
        label: "Root",
        title: "Root",
        expanded: true,
        target: ["row", "tileGroup"],
        targetClassName: "h-100 w-100",
        temp: "div",
        opt: false,
        data: {
            className: "h-100"
        }
    }]
};

export let schema = {
    $async: true,
    type: "object",
    id: "design",
    properties: {
        children: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    field: {
                        type: "string"
                    },
                    data: {
                        type: "object"
                    },
                    schema: {
                        type: "object"
                    },
                    uiSchema: {
                        type: "object"
                    },
                    children: {
                        $ref: "design#/properties/children"
                    }
                }
            }
        }
    }
};

export const uiSchema = [{
    key: "children",
    items: [
        { key: "children/-" }
    ]
}];

export const uiDomSchema = [{
    key: "children",
    field: "tree",
    "ui:temp": [],
    "ui:item.hoc": ["theme", "field", "validate", "array", "temp"]
}];

export const schemaKey = "design";
