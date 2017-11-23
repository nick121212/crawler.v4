import React from "react";
import { Menu, Icon, Layout } from "antd";
import { Route, Link } from "react-router-dom";

import { BaseComponent, MenusComponent } from "../../../common/component";
import { MenuProps } from "./constant";
import { hoc } from "./container";
import { $$top, $$bottom } from "../../data";

export class Component extends BaseComponent<MenuProps, any> {
    public render() {
        let menuProps = {
            collapsed: true,
            openAll: true,
            itemComponentRender: (key: string, currentNode: any, children: Array<JSX.Element>) => {
                if (location.pathname === key) {
                    return children;
                }
                return <Link to={{ pathname: key, state: currentNode }}>{children}</Link>;

            },
            mode: "inline",
            theme: "dark"
        };
        return (
            <Route render={({ location, history }) => {
                return (
                    <Layout className="h-100">
                        <Layout.Header className="pa0 pt3 tc">
                            <Icon className="white f2" type="dingding" />
                        </Layout.Header>

                        <Layout.Content className="flex-auto h-100 overflow-auto">
                            <MenusComponent
                                location={location}
                                history={history}
                                className="h-100 pt4"
                                nodes={$$top.toJS()}
                                {...menuProps} />
                        </Layout.Content>
                        <Layout.Footer className="pa0">
                            <MenusComponent
                                location={location}
                                history={history}
                                nodes={$$bottom.toJS()}
                                {...menuProps} />
                        </Layout.Footer>
                    </Layout>
                );
            }}></Route>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<MenuProps> = hoc(Component);
