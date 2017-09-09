import React from "react";
import { match, Link } from "react-router-dom";
import { Location } from "history";

import * as constant from "./";
import { ITableProps, DropOptionComponent } from "../../../common/components";
import { ICrudListState } from "../../../common/reducers/list";
import { IModelProxyState } from "../../../common/reducers/modelproxy";

export interface IProps {
    list: ICrudListState;
    listData: IModelProxyState<any>;

    match?: match<any>;
    location?: Location;

    setPagination: (page: number, limit: number) => void;
    fetchData: () => void;
}

export const initialState: IProps = {
    fetchData: console.log,
    list: {
        currentPage: 1,
        limit: 10,
        options: {
            pagination: {
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: (total: number, range: [number, number]) => {
                    return `共有 ${total} 条数据 当前显示 ${range[1]}到${range[0]}`;
                },
                total: 0
            },
            showPagination: true,
            table: {
                // bordered: true,
                columns: [{
                    dataIndex: "id",
                    key: "id",
                    title: "ID"
                }, {
                    dataIndex: "title",
                    key: "title",
                    title: "站点名称"
                }, {
                    dataIndex: "description",
                    key: "description",
                    title: "描述"
                }, {
                    dataIndex: "opt",
                    key: "opt",
                    render: (record: any, text: string) => {
                        return <DropOptionComponent currentItem={record} menuOptions={[
                            {
                                key: "create", name: "新建", render: (menuItem) => {
                                    return <Link to={{ pathname: constant.createRouterPath, state: { isModal: true } }}>{menuItem.name}</Link>;
                                }
                            }, {
                                key: "edit", name: "编辑", render: (menuItem) => {
                                    return <Link to={{ pathname: constant.editRouterPath, state: { isModal: true, item: record } }}>{menuItem.name}</Link>;
                                }
                            }, {
                                key: "delete", name: "删除", render: (menuItem) => {
                                    return <Link to={{ pathname: constant.deleteRouterPath, state: { isModal: true, item: record } }}>{menuItem.name}</Link>;
                                }
                            }
                        ]} />;
                    },
                    title: "操作",
                }],
                rowKey: "id",
                rows: []
            },
        },
        params: {}
    },
    listData: {
        data: {},
        error: null,
        loaded: false,
        loading: false,
    },
    setPagination: console.log
};
