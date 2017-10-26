import React from "react";
import { Layout, Button, Card, Icon, Table, Collapse } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent } from "../../../common/components";

import cls from "../styles/layout.scss";
import { WallInfo } from "./wall.info";
import { hoc } from "../containers/walls";
import { WallsComponentProps } from "../constants/walls";
import { ProjectorComponentWithHoc } from "./projector";

const { Sider } = Layout;
const titles = ["", "1 Front", "2 Right", "3 Back", "4 Left", "5 Floor"];

export class Component extends BaseComponent<WallsComponentProps, any> {
    public render(): JSX.Element {
        let { children, fetch, room, setProjectorEditChainHandle } = this.props;
        let wallKeys = room.get("wallIds").split(",").sort();

        console.log(wallKeys);

        return (
            <Card className="h-100 overflow-hidden flex flex-column" bordered={false} noHovering
                bodyStyle={{ height: "100%", overflow: "auto", padding: 0 }}
                title={
                    <span>{room.get("roomName")} Walls</span>
                } extra={
                    <div>
                        {/* <Button shape="circle" icon="plus" onClick={setProjectorEditChainHandle.bind(this, 1)} /> */}
                        {/* <Button shape="circle" icon="plus" onClick={setBuildingEditChainHandle.bind(this)} /> */}
                        {/* <Button loading={loading} shape="circle" icon="reload" onClick={execute.bind(this)} /> */}
                    </div>
                }>
                <WallInfo keys={room.get("wallIds")} disabled={true} />

                <Collapse bordered={false} defaultActiveKey={wallKeys}>
                    {
                        wallKeys.map((k: string) => {
                            return <Collapse.Panel key={room.get("roomId") + k} header={
                                titles[k]
                            } >
                                <ProjectorComponentWithHoc wallId={k} />
                            </Collapse.Panel>;
                        })
                    }
                </Collapse>

            </Card>
        );
    }
}

export const WallsComponentWithHoc = hoc(Component);
