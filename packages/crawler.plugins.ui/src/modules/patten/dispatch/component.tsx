import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card, Badge, Select, Form } from "antd";
import classNames from "classnames";
import Jsonata from "jsonata";
import Immutable from "immutable";
import { SchemaForm } from "fx-schema-form-antd/out";

import { BaseComponent } from "../../../common/component";
import { ContentProps, schemaKey, schemaFormOptions, schema, uiSchema, globalOptions } from "./constant";
import { hoc } from "./container";
import { TPanelComponent, TPanelItemComponent } from "../components/tpanel";

export class Component extends BaseComponent<ContentProps, any> {
    public render(): JSX.Element {
        const { result, execute, schemaForm } = this.props;
        const { loaded, loading, data, error } = result;

        return (
            <Layout className="h-100 overflow-hidden">
                <Layout.Content className="h-100 overflow-auto pa1">
                    <Form layout="vertical">
                        <SchemaForm schemaKey={schemaKey}
                            schemaFormOptions={schemaFormOptions}
                            schema={schema}
                            getCurrentState={(state) => {
                                return state.getIn(["modules", "partten", "test", "schemaForm"]);
                            }}
                            uiSchema={uiSchema}
                            globalOptions={globalOptions}>
                            <Form.Item>
                                {error ? <div style={{ color: "red" }}>{error.message}</div> : null}
                                <Button type="primary" className="w-90" loading={loading}
                                    onClick={execute.bind(this)}>确定</Button>
                            </Form.Item>
                        </SchemaForm>
                    </Form>
                </Layout.Content>
                <Layout.Footer className="bg-white">

                </Layout.Footer>
            </Layout>
        );
    }
}

export const TestComponentWithHoc = hoc(Component);
