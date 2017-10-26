import React from "react";
import { Badge } from "antd";
import { RouteComponentProps } from "react-router-dom";

import { IModelProxyState } from "../../../common/reducers/modelproxy";

export interface ProjectorComponentProps extends RouteComponentProps<any> {
    fetch: IModelProxyState<any>;
    execute?: () => {};

    room: any;
    wallId: number;

    setProjectorEditChainHandle?: (wallId: number) => {};
    changeSelectProjectorHandle?: (chain: any) => {};
}

export const columns = [{
    title: "序号",
    dataIndex: "",
    key: "",
    render: (text, record, index) => {
        return <Badge count={index + 1}
            style={{ backgroundColor: "#fff", color: "#999", boxShadow: "0 0 0 1px #d9d9d9 inset" }} />;

    }
}, {
    title: "name",
    dataIndex: "projectorName",
    key: "projectorName",
}];
