import React from "react";
import { PaginationProps } from "antd/lib/pagination";
import { Layout, Table, Pagination } from "antd";

import { BaseComponent } from "./";

export interface ITableProps {
    /**
     * 表格的属性配置
     */
    table: Object;
    /**
     * 分页组件的属性配置
     */
    pagination: PaginationProps;
    /**
     * 是否显示分页组件
     */
    showPagination: boolean;
}

/**
 * 表格组件，自带分页
 */
export class TableComponent extends BaseComponent<ITableProps, any> {
    constructor(props: ITableProps, context: any) {
        super(props, context);
    }

    /**
     * 渲染组件
     */
    public render(): JSX.Element {
        const { table, pagination, showPagination = true } = this.props;

        return (
            <Layout style={{ backgroundColor: "transparent" }}>
                <Layout style={{ backgroundColor: "transparent" }}>
                    <Table pagination={false} {...table}></Table>
                </Layout>
                {
                    showPagination &&
                    <div style={{ padding: 10, textAlign: "right", borderTop: "1px solid #e8e8e8" }} >
                        <Pagination style={{ display: "inline-block" }} {...pagination}></Pagination>
                    </div>
                }
            </Layout>
        );
    }
}
