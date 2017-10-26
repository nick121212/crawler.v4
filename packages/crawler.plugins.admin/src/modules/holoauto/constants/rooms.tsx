import React from "react";
import { Badge } from "antd";

import { IModelProxyState } from "../../../common/reducers/modelproxy";

export interface RoomProps {
    building: any;
    room?: any;

    fetch: IModelProxyState<any>;
    execute?: () => {};

    changeSelectRoomHandle?: (record: any) => {};
    setRoomEditChainHandle?: () => {};
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
    dataIndex: "roomName",
    key: "roomName",
}];
