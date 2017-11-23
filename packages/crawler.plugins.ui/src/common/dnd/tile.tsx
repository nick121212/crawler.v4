import React from "react";

const config = {
    icon: "ExpandTileLegacyMirrored",
    label: "Tile",
    sourceType: "tile",
    field: "design",
    temp: "tile",
    target: ["image", "text"],
    targetConfig: {
        canDrop(props: any, monitor) {
            return !props.formItemData.children || props.formItemData.children.length === 0;
        },
    },
    data: {
        x: 2,
        y: 2,
        className: "overflow-hidden h-100 ba b--dashed b--gray"
    },
    schema: {
        type: "object",
        properties: {
            x: {
                type: "number"
            },
            y: {
                type: "number"
            },
            isSelect: {
                type: "boolean"
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
