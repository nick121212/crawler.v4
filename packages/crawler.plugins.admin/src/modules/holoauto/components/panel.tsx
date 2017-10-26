import React from "react";
import { Layout, Button, Card, Table } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent } from "../../../common/components";
import { mainHoc } from "../containers/panel";
import { PanelComponentProps, columns } from "../constants/panel";

let titles = ["", "1 Front", "2 Right", "3 Back", "4 Left", "5 Floor"];
let widths = ["", "LH", "HW", "LH", "WH", "WL"];

const getSize = (size: string, length: number, height: number, width: number): string => {
    let sizes = size.split("");

    sizes = sizes.map((s: string) => {
        let rtn = 0;

        switch (s) {
            case "L":
                rtn = length;
                break;
            case "H":
                rtn = height;
                break;
            case "W":
                rtn = width;
                break;
        }

        return rtn.toString();
    });

    return sizes.join("*");
};

export class Component extends BaseComponent<PanelComponentProps, any> {
    public render(): JSX.Element {
        let { children, fetch, execute, building, close, projector, room, setPanelEditChainHandle } = this.props;
        const { data, loading, loaded } = fetch;
        const dataSource = loaded && data.get("data") ? data.get("data").toJSON() : [];

        return (
            <Card className="h-100 overflow-hidden flex flex-column" bordered={false} noHovering
                bodyStyle={{ height: "100%", overflow: "auto", padding: 0 }}
                title={
                    <span>{projector.get("projectorName")} Panel</span>
                } extra={
                    <div>
                        <Button shape="circle" icon="plus" onClick={setPanelEditChainHandle.bind(this)} />
                        <Button loading={loading} shape="circle" icon="reload" onClick={execute.bind(this)} />
                    </div>
                }>
                <ul className="list pl0 mt0  center">
                    <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
                        <img className="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-mrmrs.jpg" />
                        <div className="pl3 flex-auto">
                            <span className="f6 db black-70">{titles[projector.get("wallId")]}</span>
                            <span className="f6 db black-70">{getSize(widths[projector.get("wallId")], room.get("length"), room.get("width"), room.get("height"))}</span>
                        </div>
                        <div>
                            <a href="tel:" className="f6 link">direction</a>
                        </div>
                    </li>
                    <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
                        <img className="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-mrmrs.jpg" />
                        <div className="pl3 flex-auto">
                            <span className="f6 db black-70">{projector.get("projectorName")}</span>
                            <span className="f6 db black-70">displaying regions define</span>
                        </div>
                        <div>
                            <a href="tel:" className="f6 link">{projector.get("length")}*{projector.get("width")}</a>
                        </div>
                    </li>
                </ul>

                {loaded &&
                    <Table rowKey="id"
                        rowSelection={{
                            type: "radio",
                            selectedRowKeys: [building ? building.get("id") : null],
                            onSelect: (record: any, selected) => {
                                // changeSelectBuildingHandle(record);
                            }
                        }}
                        showHeader={false}
                        loading={loading} dataSource={dataSource}
                        pagination={false} columns={columns} />}
            </Card>
        );
    }
}

export const PanelComponentWithHoc = mainHoc(Component);
