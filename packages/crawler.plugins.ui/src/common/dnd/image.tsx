import React from "react";

const config = {
    icon: "Picture",
    label: "Image",
    field: "design",
    fieldTemp: "image",

    sourceType: "image",
    data: {
        className: "ba b--dashed b--gray",
        useLazyLoad: true,
        src: "http://face.feng.com/data/avatar/000/13/52/67_avatar_big.jpg"
    },
    schema: {
        type: "object",
        properties: {
            src: {
                type: "string"
            },
            useLazyLoad: {
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
