import React from "react";
import { Layout, Button, Card, Icon, Table } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent } from "../../../common/components";
import { RoomProps, columns } from "../constants/rooms";
import { mainHoc } from "../containers/rooms";


export class Component extends BaseComponent<RoomProps, any> {
    public render(): JSX.Element {
        let { building, room } = this.props;
        let { fetch, execute, changeSelectRoomHandle, setRoomEditChainHandle } = this.props;
        const { data, loading, loaded } = fetch;
        const dataSource = loaded && data.get("data") ? data.get("data").toJSON() : [];

        return (
            <Card className="h-100 overflow-hidden flex flex-column"
                bodyStyle={{ height: "100%", overflow: "auto", padding: 0 }}
                bordered={false} noHovering
                title={
                    <div>
                        <span>{building.get("buildName")} ShowRooms</span>
                    </div>
                } extra={
                    <div>
                        <Button shape="circle" icon="plus" onClick={setRoomEditChainHandle.bind(this)} />
                        <Button loading={loading} shape="circle" icon="reload" onClick={execute.bind(this)} />
                    </div>
                }>
                {loaded &&
                    <Table rowKey="id"
                        key={building.get("buildId")}
                        rowSelection={{
                            type: "radio",
                            selectedRowKeys: [room ? room.get("id") : null],
                            onSelect: (record: any, selected) => {
                                changeSelectRoomHandle(record);
                            }
                        }}
                        showHeader={false}
                        loading={loading} dataSource={dataSource}
                        pagination={false} columns={columns} />}
            </Card>
        );
    }
}

export const BuildingRoomsComponentWithHoc = mainHoc(Component);
