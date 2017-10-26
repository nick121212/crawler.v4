import React from "react";
import { Layout, Button, Card, Table } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent } from "../../../common/components";
import { mainHoc } from "../containers/building";
import { BuildingComponentProps, getColumns } from "../constants/building";

export class Component extends BaseComponent<BuildingComponentProps, any> {
    public render(): JSX.Element {
        let { children, fetch, execute, setBuildingEditChainHandle, changeSelectBuildingHandle, building, remove } = this.props;
        const { data, loading, loaded } = fetch;
        const dataSource = loaded && data.get("data") ? data.get("data").toJSON() : [];

        return (
            <Card className="h-100 overflow-hidden flex flex-column" bordered={false} noHovering
                bodyStyle={{ height: "100%", overflow: "auto", padding: 0 }}
                title="Buildings" extra={
                    <div>
                        <Button shape="circle" icon="plus" onClick={setBuildingEditChainHandle.bind(this)} />
                        <Button loading={loading} shape="circle" icon="reload" onClick={execute.bind(this)} />
                    </div>
                }>
                {loaded &&
                    <Table rowKey="id"
                        rowSelection={{
                            type: "radio",
                            selectedRowKeys: [building ? building.get("id") : null],
                            onSelect: (record: any, selected) => {
                                changeSelectBuildingHandle(record);
                            }
                        }}
                        showHeader={false}
                        loading={loading} dataSource={dataSource}
                        pagination={false} columns={getColumns(remove)} />}
            </Card>
        );
    }
}

export const BuildingComponentWithHoc = mainHoc(Component);
