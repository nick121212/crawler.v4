import React from "react";
import { Layout, Switch, Icon } from "antd";
import { Link } from "react-router-dom";
import { BaseComponent, MenusComponent } from "../../../common/components";
import data from "../menu";

/**
 * 头部导航
 */
export class MenuComponent extends BaseComponent<any, any> {
    public render(): JSX.Element {
        let { theme, collapsed, location, history, onCurrentKeyChanged = console.log } = this.props;

        return (
            <Layout>
                <MenusComponent style={{ border: "none" }}
                    location={location}
                    history={history}
                    onSelect={onCurrentKeyChanged.bind(this)}
                    collapsed={collapsed}
                    openAll={true}
                    itemComponentRender={(key: string, currentNode: any, children: Array<JSX.Element>) => {
                        return <Link to={{ pathname: key, state: currentNode }}>{children}</Link>;
                    }}
                    nodes={data.value}
                    mode={collapsed ? "vertical" : "inline"}
                    theme={theme} />
            </Layout>
        );
    }
}
