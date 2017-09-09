import React from "react";
import { ButtonProps } from "antd/lib/button/button";
import { Layout, Row, Col, Button } from "antd";

import { BaseComponent } from "./";

export interface ITableTitleProps {
    title: string;
    loading?: boolean;
    btnOptions?: ButtonProps;
}

/**
 * 表格组件，自带分页
 */
export class TableTitleComponent extends BaseComponent<ITableTitleProps, any> {
    constructor(props: ITableTitleProps, context: any) {
        super(props, context);
    }

    /**
     * 渲染组件
     */
    public render(): JSX.Element {
        const { title, loading, btnOptions } = this.props;

        return (
            <Layout style={{ backgroundColor: "transparent", paddingRight: 10, paddingLeft: 10 }}>
                <Row type="flex" justify="space-between">
                    <Col><h2>{title}</h2></Col>
                    <Col>
                        <Button type="primary" icon="reload" shape="circle" loading={loading} disabled={loading} {...btnOptions}>
                        </Button>
                    </Col>
                </Row>

            </Layout>
        );
    }
}
