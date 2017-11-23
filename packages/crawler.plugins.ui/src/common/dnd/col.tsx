import React from "react";

const config = {
    icon: "SetTile",
    label: "Col",
    sourceType: "col",
    field: "design",
    target: ["image", "row"],
    temp: "col",
    targetClassName: "w-100 h-100",
    data: {
        width: 1,
        className: "ba b--dashed b--gray"
    },
    schema: {
        type: "object",
        properties: {
            width: {
                type: "number"
            },
            order: {
                type: "number"
            },
            className: {
                type: "string"
            }
        }
    },
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
