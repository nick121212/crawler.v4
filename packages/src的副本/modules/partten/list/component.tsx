import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card, Badge, Select, Tag } from "antd";
import classNames from "classnames";
import Jsonata from "jsonata";
import Immutable from "immutable";

import { BaseComponent } from "../../../common/component";
import { ContentProps } from "./constant";
import { hoc } from "./container";
import { TPanelComponent, TPanelItemComponent } from "../components/tpanel";

export class Component extends BaseComponent<ContentProps, any> {
    public render(): JSX.Element {
        const { fetchModel, setFilterGroup, filter, setOperations, execute } = this.props;
        const { loaded, loading, data, error } = fetchModel;
        let dataObj;

        if (error) {
            return <span>{error.message}</span>;
        }

        if (loaded) {
            dataObj = data.get("list").groupBy(x => x.get("pin"));
            if (filter.get("filterGroup")) {
                dataObj = dataObj.filter((d, i) => {
                    return i.get(0) === filter.get("filterGroup");
                });
            }
        }

        // setOperations(<Button onClick={execute.bind(this)}
        //     loading={loading}
        //     className="mr1" type="primary" shape="circle" icon="reload" />);

        return (
            <Layout className="h-100 overflow-hidden">
                <Layout.Content className="h-100 overflow-auto pa1">
                    <div className="h-100 flex overflow-auto flex-auto">
                        {
                            loaded &&
                            dataObj.map((d, index) => {
                                return <TPanelComponent className="w-20-l h-100 dt-l"
                                    key={index.get(0)} title={index.get(0)}
                                    items={d.map((node, idx) => {
                                        return <TPanelItemComponent data={node}
                                            index={idx + 1} key={node.get("instance")} />;
                                    })} />;
                            })
                        }
                    </div>
                </Layout.Content>
                <Layout.Footer className="bg-white">
                    <span className="pr2 dib">model:</span>
                    <Badge text={"consume"} status={"default"} className="mr2" />
                    <Badge text={"actor"} status={"warning"} />

                    <span className="pr2 pl5 dib">type:</span>
                    <Badge text={"tcp"} status={"error"} className="mr2" />
                    <Badge text={"web"} status={"warning"} />

                    <div className="fr">
                        {
                            filter.get("filterGroup") ?
                                <Tag className="fr" color="red" closable onClose={setFilterGroup.bind(this, "")}>
                                    {filter.get("filterGroup")}
                                </Tag>
                                :
                                <Select style={{ width: 150 }}
                                    allowClear
                                    onChange={setFilterGroup.bind(this)} placeholder="所有模式组">
                                    {
                                        loaded &&
                                        dataObj.map((d, index) => {
                                            return <Select.Option
                                                key={index.get(0)}
                                                title={index.get(0)}
                                                value={index.get(0)}>
                                                {index.get(0)}
                                            </Select.Option>;
                                        })
                                    }
                                </Select>
                        }
                    </div>
                </Layout.Footer>
            </Layout>
        );
    }
}

export const ListComponentWithHoc = hoc(Component);
