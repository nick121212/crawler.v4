import React from "react";
import { Form, Button, Steps } from "antd";

import { BaseComponent, AntSchemaForm, IAntdSchemaFromProps } from "./";

const Step = Steps.Step;

export interface IProps {
    formData: any;
    config: Array<IAntdSchemaFromProps>;
    onSubmit?: <T>(data: T) => void;

    loading?: boolean;
    validator?: () => void;
    getData?: () => any;
}

/**
 * 基于antd的schemaForm
 */
export class AntSchemaWizardFormComponent extends BaseComponent<IProps, any> {
    private currentIndex: number = 0;

    /**
     * 描绘界面
     */
    public render(): JSX.Element | null {
        const {  formData, config,  loading } = this.props;
        const currentForm = config.length > this.currentIndex ? config[this.currentIndex] : null;

        if (!currentForm) {
            return null;
        }

        return (
            <span>
                <div style={{ margin: 5, borderBottom: "1px solid #e5e5e5" }}>
                    <Steps size="small" current={this.currentIndex + 1}>
                        {
                            config.map((c, i) => {
                                let status = "wait";

                                if (this.currentIndex > i) {
                                    status = "finish";
                                } else if (this.currentIndex === i) {
                                    status = "process";
                                } else {
                                    status = "wait";
                                }

                                return <Step key={i.toString()} status={status} title={c.schema.description} />;
                            })
                        }
                    </Steps>
                </div>
                <AntSchemaForm onSubmit={this.handleSubmit.bind(this)}
                    formData={formData}
                    formOptions={currentForm.formOptions}
                    schema={currentForm.schema}
                    uiSchema={currentForm.uiSchema}
                    globalOptions={currentForm.globalOptions}>
                    <Form.Item style={{ textAlign: "center" }}>
                        {this.currentIndex > 0 && <Button style={{ marginRight: 5 }} icon={"next"} type="primary" ghost={true} loading={loading} onClick={this.prev.bind(this)}>
                            上一步
                        </Button>}
                        {config.length > this.currentIndex && <Button ghost={config.length > this.currentIndex} icon={"next"} type="primary" loading={loading} htmlType="submit">
                            {config.length - 1 === this.currentIndex ? "完成" : "下一步"}
                        </Button>}
                    </Form.Item>
                </AntSchemaForm>
            </span>
        );
    }

    private prev(e: Event) {
        e.preventDefault();

        this.currentIndex--;
        this.forceUpdate();
    }

    /**
     * 提交表单
     * @param formData 数据
     */
    private handleSubmit() {
        const { onSubmit, config, formData } = this.props;

        if (this.currentIndex < config.length) {
            if (this.currentIndex + 1 === config.length) {
                return onSubmit && onSubmit(formData);
            }
            this.currentIndex++;
            return this.forceUpdate();
        }
    }
}
