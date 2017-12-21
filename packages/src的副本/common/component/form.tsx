import React from "react";
import { Form, Button } from "antd";
import { SchemaFormCreate, SchemaForm, FormReducer } from "fx-schema-form-antd";

import { ajv } from "../schema.form";

export interface SchemaFormComponentProps {
    schemaKey: string;
    schema: any; uiSchema: any;
    globalOptions: any;
    isLoading?: boolean;
    isValid?: boolean;
    reducer: FormReducer<any>;
    data?: any;

    onSubmit: (data: any) => void;
    getCurrentState?: (state: any, props) => any;
}

export class SchemaFormComponent extends React.PureComponent<SchemaFormComponentProps, any> {

    private async doSubmit(): Promise<void> {
        let { schemaKey, reducer, onSubmit, data } = this.props;
        let metaData = SchemaFormCreate.metas[schemaKey];
        let timeId;

        try {
            timeId = setTimeout(() => {
                reducer.actions.updateMetaState({ isLoading: true, isValid: false });
            }, 200);
            reducer.actions.updateMetaState({
                isLoading: false,
                meta: await metaData.validateAll(data)
            });
            clearTimeout(timeId);
        } catch (e) {
            console.log("dfdfdfdf", e);
        }
        if (this.props.isValid) {
            if (onSubmit) {
                onSubmit(data);
            }
        }
    }

    public render() {
        let { schema, uiSchema, globalOptions, isLoading, schemaKey, getCurrentState } = this.props;

        return (
            <div>
                <SchemaForm schemaKey={schemaKey}
                    schemaFormOptions={{
                        ajv
                    }}
                    key={schemaKey}
                    getCurrentState={getCurrentState}
                    schema={schema}
                    uiSchema={uiSchema}
                    globalOptions={globalOptions}>
                </SchemaForm>

                <Form.Item labelCol={{ xs: 6, offset: 12 }} wrapperCol={{ xs: 6, offset: 12 }}>
                    <Button type="primary" loading={isLoading} onClick={this.doSubmit.bind(this)}>提交</Button>
                </Form.Item>
            </div>
        );
    }
}
