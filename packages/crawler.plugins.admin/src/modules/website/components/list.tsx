import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";

import { BaseComponent, TableComponent, TableTitleComponent } from "../../../common/components";
import { IProps } from "../constants/list";
import { hoc } from "../containers/list";
import { listData as listDataReducer, list as listReducer } from "../reducers/list";

export class ListComponent extends BaseComponent<IProps, any> {
    public render(): JSX.Element {
        const { list, listData, setPagination, location, fetchData } = this.props;
        const { currentPage } = list;
        const { pagination = {}, showPagination = true, table } = list.options;
        const { loaded = false, loading = false, data = { rows: [], total: 0 } } = listData;
        const { rows = [], total = 0 } = data || { rows: [], total: 0 };
        const { state = { name: "" } } = location || {};

        return (
            <Layout style={{ backgroundColor: "transparent" }}>
                <TableComponent table={{
                    ...table, dataSource: rows,
                    loading: loading,
                    title: () =>
                        <TableTitleComponent title={state.name} loading={loading} btnOptions={{
                            onClick: fetchData.bind(this)
                        }} />
                }}
                    showPagination={showPagination}
                    pagination={{
                        current: currentPage,
                        onChange: setPagination.bind(this),
                        onShowSizeChange: setPagination.bind(this),
                        pageSize: 10,
                        total: total,
                        ...pagination
                    }} />
            </Layout>
        );
    }
}

export default hoc(ListComponent);
