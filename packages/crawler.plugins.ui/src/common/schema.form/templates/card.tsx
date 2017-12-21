import React from "react";

import { SchemaFormItemProps, ArrayHocOutProps } from "fx-schema-form-react";

import CommandBar from "react-uwp/CommandBar";
import AppBarButton from "react-uwp/AppBarButton";
import AppBarSeparator from "react-uwp/AppBarSeparator";

export interface AntdCardTempProps extends SchemaFormItemProps, ArrayHocOutProps {
    tempKey: string;
}

export class AntdCardTemp extends React.Component<AntdCardTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, ItemButtons, meta } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});
        const { uiSchema, title } = mergeSchema;
        let { dirty, isValid, errorText = "", isShow = true } = meta;
        let ItemButtonsComponent: JSX.Element = ItemButtons ? <ItemButtons /> : null;

        return (
            <div style={{
                minHeight: 80,
                height: "100%"
            }}>
                {ItemButtonsComponent}
                <span style={{
                    display: isShow ? "block" : "none",
                    height: "100%"
                }}>
                    {children}
                </span>
            </div>
        );
    }
}
