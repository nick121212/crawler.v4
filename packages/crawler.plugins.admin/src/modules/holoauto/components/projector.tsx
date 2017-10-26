import React from "react";
import { Layout, Button, Card, Icon, Table } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent } from "../../../common/components";

import cls from "../styles/layout.scss";
import { WallInfo } from "./wall.info";
import { hoc } from "../containers/projector";
import { columns, ProjectorComponentProps } from "../constants/projector";

const { Sider } = Layout;

export class Component extends BaseComponent<ProjectorComponentProps, any> {
    public render(): JSX.Element {
        let { fetch, room, setProjectorEditChainHandle, changeSelectProjectorHandle, execute } = this.props;
        const { data, loading, loaded } = fetch;
        const dataSource = loaded && data.get("data") ? data.get("data").toJSON() : [];

        return (
            <Card className="h-100 overflow-hidden flex flex-column" bordered={false} noHovering
                bodyStyle={{ height: "100%", overflow: "auto", padding: 0 }}
                title="Projectors"
                extra={
                    <div>
                        <Button shape="circle" icon="plus" onClick={setProjectorEditChainHandle.bind(this, 1)} />
                        <Button loading={loading} shape="circle" icon="reload" onClick={execute.bind(this)} />
                    </div>
                }>
                {loaded && data.get("data") &&
                    <Table rowKey="id"
                        rowSelection={{
                            type: "radio",
                            onSelect: (record: any, selected) => {
                                changeSelectProjectorHandle(record);
                            }
                        }}
                        showHeader={false}
                        loading={loading} dataSource={dataSource}
                        pagination={false} columns={columns} />}
            </Card>
        );
    }
}

export const ProjectorComponentWithHoc = hoc(Component);
