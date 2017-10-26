import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card, Form } from "antd";
import classNames from "classnames";
import { SchemaForm } from "fx-schema-form-antd";

import { BaseComponent } from "../../../common/components";
import { hoc } from "../containers/create";
import { CreateComponentProps, globalOptions, schema, uiSchema, schemaFormOptions, schemaKey, reducerKeys } from "../constants/create";
import { ajv } from "../../../common/schema.form/index";

export class CreateComponent extends BaseComponent<CreateComponentProps, any> {
    public render(): JSX.Element {
        const { submitForm, schemaForm, submitModel } = this.props;
        const { loading } = submitModel;

        return (
            <div>
                <SchemaForm schemaKey={schemaKey}
                    schemaFormOptions={schemaFormOptions}
                    schema={schema}
                    getCurrentState={(state) => {
                        let d = state.getIn(reducerKeys.concat(["schemaForm"]));
                        // console.log(d);
                        return d;
                    }}
                    uiSchema={uiSchema}
                    RootComponent={Form}
                    globalOptions={globalOptions}>
                    <Form.Item labelCol={{ xs: 6, offset: 12 }} wrapperCol={{ xs: 6, offset: 12 }}>
                        <Button type="primary" loading={loading} onClick={() => {
                            submitForm(schemaForm.data);
                        }}>提交</Button>
                    </Form.Item>
                </SchemaForm>
            </div>
        );
    }
}

export const CreateComponentWithHoc = hoc(CreateComponent);
