import React from "react";
import { Card, Row, Col } from "antd";

import { SchemaFormItemProps } from "fx-schema-form-antd";

export interface AntdGridTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class AntdGridTemp extends React.Component<AntdGridTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema, ItemButtons, meta } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});
        const { uiSchema, title } = mergeSchema;
        let { dirty, isValid, errorText = "", isShow = true } = meta;
        let { showButtons, ...extra } = tempOptions;

        return (
            <Card {...extra} extra={showButtons ? <Col>{ItemButtons ? <ItemButtons /> : null}</Col> : null}>
                <Row type="flex">
                    {isShow ? children : null}
                </Row>
            </Card>
        );
    }
}
