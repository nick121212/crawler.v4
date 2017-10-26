import React from "react";

import { IModelProxyState } from "../../../common/reducers/modelproxy";
import { ICrudFormState } from "../../../common/reducers/form";
import { globalOptions, ajv, schemaFormOptions } from "../../../common/schema.form";
import { WallDetailInfoComponentWithHoc } from "../components/wall.detail.info";

export interface RoomEditComponentProps {
    submit: IModelProxyState<any>;
    execute?: () => {};
    executeAction?: (schemaFormData: any, build: any, func: Function) => {};
    schemaForm: any;
    schemaFormData: any;

    room: any;
    build: any;

    close?: () => {};
    resetMeta?: (schemaFormData: any) => {};
}

export const schemaKey = "roomCreate";
export const schema = ajv.getSchema("room").schema;
export const uiSchema = ["*", {
    key: "wallIds",
    widget: "wallInfo"
}, {
        key: "wallIds",
        widget: "wallDetailInfo",
        options: {
            formItem: {
                label: ""
            },
            hoc: {
                temp: {
                    equalKeys: ["length", "width", "height"]
                }
            }
        }
    }];

export {
    globalOptions,
    ajv,
    schemaFormOptions
};
