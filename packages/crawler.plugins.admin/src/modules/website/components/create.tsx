import React from "react";
import { Table, Icon, Pagination, Layout, Button, Form, Modal } from "antd";
import { History } from "history";
import { SchemaForm } from "react-schema-form-antd";

import { BaseComponent, AntSchemaForm } from "../../../common/components";
import { IProps } from "../constants/create";
import { hoc } from "../containers/create";

export class CreateComponent extends BaseComponent<IProps, any> {

    public onSubmit(data, data1) {
        console.log(data, data1);
    }

    public render(): JSX.Element {
        const { history, children, form } = this.props;
        const { schema, uiSchema, globalOptions, formData } = form;

        return (
            <Modal
                title="新建站点"
                visible={true}
                onOk={console.log}
                width={650}
                footer={null}
                onCancel={() => {
                    history ? history.push("/settings/website") : console.log("");
                }}>
                <Layout style={{ backgroundColor: "transparent" }}>
                    <Layout>
                        <AntSchemaForm onSubmit={this.onSubmit.bind(this)} formData={formData} schema={schema} uiSchema={uiSchema} globalOptions={globalOptions} >
                            <div className="ant-modal-footer">
                                <Button icon={"done"} htmlType="submit" type="primary">
                                    确定
                                </Button>
                            </div>
                        </AntSchemaForm>
                    </Layout>
                </Layout>
            </Modal>
        );
    }
}

export default hoc(SchemaForm.create<any>(CreateComponent));
