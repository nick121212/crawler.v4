import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card, Badge, Select, Form } from "antd";
import classNames from "classnames";
import Jsonata from "jsonata";
import Immutable from "immutable";
import { SchemaForm } from "fx-schema-form-antd/out";

import { BaseComponent, SchemaFormComponent } from "../../../common/component";
import { ContentProps, schemaKey, schemaFormOptions, schema, uiSchema, globalOptions, ajv } from "./constant";
import { hoc } from "./container";
import { schemaForm as schemaFormReducer } from "./reducer";
import { TPanelComponent, TPanelItemComponent } from "../components/tpanel";

export class Component extends BaseComponent<ContentProps, any> {
    public render(): JSX.Element {
        const { result, execute, schemaForm } = this.props;
        const { loaded, loading, data, error } = result;

        return (
            <Layout className="h-100 overflow-hidden">
                <Layout.Content className="h-100 overflow-auto pa3 bg-white">
                    <div className="pa4 error red tc">
                        {error ? error.message : null}
                    </div>
                    <Form>
                        <SchemaFormComponent
                            schemaKey={schemaKey}
                            schema={schema}
                            uiSchema={uiSchema}
                            data={schemaForm.data}
                            isLoading={loading || schemaForm.meta.isLoading}
                            isValid={schemaForm.meta.isValid}
                            globalOptions={globalOptions}
                            reducer={schemaFormReducer}
                            onSubmit={execute.bind(this, schemaForm)}
                            getCurrentState={(state) => {
                                return state.getIn(["modules", "partten", "test", "schemaForm"]);
                            }}
                        />
                    </Form>
                </Layout.Content>
            </Layout>
        );
    }
}

export const TestComponentWithHoc = hoc(Component);
