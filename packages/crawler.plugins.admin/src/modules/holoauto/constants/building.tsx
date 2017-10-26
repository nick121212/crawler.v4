import React from "react";
import { Badge, Popconfirm } from "antd";
import { RouteComponentProps } from "react-router-dom";
import { IModelProxyState } from "../../../common/reducers/modelproxy";

export interface BuildingComponentProps extends RouteComponentProps<any> {
    fetch: IModelProxyState<any>;
    building: any;
    execute?: () => {};
    remove?: () => {};

    setBuildingEditChainHandle?: (chain: any[]) => {};
    changeSelectBuildingHandle?: (chain: any) => {};
}

export const getColumns = (remove: Function) => {
    return [{
        title: "序号",
        dataIndex: "left",
        render: (text, record, index) => {
            return <Badge count={index + 1}
                style={{ backgroundColor: "#fff", color: "#999", boxShadow: "0 0 0 1px #d9d9d9 inset" }} />;

        }
    }, {
        title: "name",
        dataIndex: "buildName",
        key: "buildName",
    }, {
        title: "操作",
        dataIndex: "right",
        className: "tr",
        render: (text, record, index) => {
            return <Popconfirm title="确定要删除么？"
                onConfirm={() => {
                    remove(record);
                }}
                okText="确定" cancelText="取消">
                <a href="#" >删除</a>
            </Popconfirm>;

        }
    }];
};
