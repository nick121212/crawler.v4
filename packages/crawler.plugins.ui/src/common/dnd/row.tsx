import React from "react";

const config = {
    icon: "Type",
    label: "Row",
    sourceType: "row",
    field: "design",
    fieldTemp: "row",
    target: ["col"],
    targetClassName: "w-100",
    data: {
        align: "top",
        justify: "",
        wrap: false,
        className: "ba b--dashed b--gray",
        style: {
            minHeight: 100
        }
    },
    schema: {
        type: "object",
        properties: {
            direction: {
                type: "string",
                enum: ["", "row", "column"]
            },
            align: {
                type: "string"
            },
            justify: {
                type: "string"
            },
            wrap: {
                type: "boolean"
            },
            className: {
                type: "string"
            }
        }
    },
    uiSchema: [{
        key: "direction",
        widget: "select"
    }, "*"
    ],
    sourceConfig: {
        beginDrag(props: any) {
            return {};
        },
        endDrag(props, monitor) {
            const item = monitor.getItem();
            const dropResult = monitor.getDropResult();

            if (dropResult && dropResult.cb) {
                dropResult.cb(config);
            }
        }
    }
};

export default config;
