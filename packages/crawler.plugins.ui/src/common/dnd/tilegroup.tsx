import React from "react";

const config = {
    icon: "Tiles",
    label: "Tile Group",
    field: "design",
    sourceType: "tileGroup",
    fieldTemp: "tile.group",
    target: ["tile"],
    data: {
        tileWidth: 50,
        tileHeight: 50,
        maxGrid: 5,
        className: "ba b--dashed b--gray"
    },
    schema: {
        type: "object",
        properties: {
            tileWidth: {
                type: "number"
            },
            tileHeight: {
                type: "number"
            },
            maxGrid: {
                type: "number"
            },
            className: {
                type: "string"
            }
        }
    },
    uiSchema: ["*"],
    sourceConfig: {
        beginDrag(props: any) {
            return {
                name: props.name
            };
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
