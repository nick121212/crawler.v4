import React from "react";
import { Form } from "antd";
import { SchemaForm } from "react-schema-form-antd";
import * as tv4 from "tv4";

import { BaseComponent } from "./";

export interface IAntdSchemaFromProps {
    formData?: any;
    schema: tv4.JsonSchema;
    uiSchema: any;
    globalOptions?: any;

    validator?: () => boolean;
    getData?: () => any;

    icon?: any;
    form?: any;
    onSubmit?: (fomData: any) => void;
    formOptions?: any;
}

export interface IProps extends IAntdSchemaFromProps {
    loading?: boolean;
    // validator?: () => void;
    getData?: () => any;
    onSubmit?: (data: any) => void;
    formOptions?: Object;
}

/**
 * 基于antd的schemaForm
 */
class AntSchemaFormComponent extends BaseComponent<IProps, any> {

    /**
     * 描绘界面
     */
    public render() {
        const {  formOptions = {}, children } = this.props;

        return (
            <Form onSubmit={this.handleSubmit.bind(this)} {...formOptions}>
                {children}
            </Form>
        );
    }

    /**
     * 提交表单
     * @param formData 数据
     * @param e        Event
     */
    private handleSubmit(e: Event) {
        const { onSubmit } = this.props;

        e.preventDefault();
        if (this.props.validator && this.props.validator()) {
            if (onSubmit && this.props.getData) {
                onSubmit(this.props.getData());
            }
        }
    }
}

export const AntSchemaForm = SchemaForm.create<IProps>(AntSchemaFormComponent);
