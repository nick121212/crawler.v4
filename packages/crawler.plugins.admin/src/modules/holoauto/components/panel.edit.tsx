import React from "react";
import { Layout, Button, Card, Table, Form } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";
import { SchemaForm } from "fx-schema-form-antd";

import { BaseComponent } from "../../../common/components";
import { hoc } from "../containers/panel.edit";
import { schemaForm } from "../reducers/panel.edit";
import { PanelEditComponentProps } from "../constants/panel.edit";
import { schemaKey, schemaFormOptions, schema, uiSchema, globalOptions } from "../constants/panel.edit";

export class Component extends BaseComponent<PanelEditComponentProps, any> {
    public render(): JSX.Element {
        const { submit, schemaFormData, execute, close } = this.props;
        const { loading, error } = submit;

        return (
            <Card className="h-100 overflow-hidden flex flex-column"
                bodyStyle={{ height: "100%", overflow: "auto" }}
                bordered={false} noHovering title="New Panel"
                extra={
                    <Button shape="circle" icon="left" onClick={close.bind(this)} />
                }>
                <Form layout="vertical">
                    <SchemaForm schemaKey={schemaKey}
                        schemaFormOptions={schemaFormOptions}
                        schema={schema}
                        getCurrentState={(state) => {
                            return state.getIn(["app", "holoauto", "panelEdit", "schemaForm"]);
                        }}
                        uiSchema={uiSchema}
                        globalOptions={globalOptions}>
                        <Form.Item>
                            {error ? <div style={{ color: "red" }}>{error.message}</div> : null}
                            <Button type="primary" className="w-90" loading={loading} onClick={execute.bind(this)}>确定</Button>
                        </Form.Item>
                    </SchemaForm>
                </Form>
            </Card>
        );
    }
}

export const PanelEditComponentWithHoc = hoc(Component);
