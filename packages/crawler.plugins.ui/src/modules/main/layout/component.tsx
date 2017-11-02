import React from "react";
import { Layout, Menu, Icon } from "antd";

import { BaseComponent } from "../../../common/component/base";
import { LayoutProps } from "./constant";
import { hoc } from "./container";

import { ComponentWithHoc as MenuComponent } from "../menu/component";
import { ComponentWithHoc as HeaderComponent } from "../header/component";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, ItemGroup, Item } = Menu;

export class Component extends BaseComponent<LayoutProps, any> {
    public render() {
        let { theme, children } = this.props;

        return (
            <Layout className="h-100">
                <Sider
                    collapsible={false}
                    collapsed={true}
                    collapsedWidth={64}
                    breakpoint="xs">
                    <MenuComponent />
                </Sider>
                <Layout>
                    <HeaderComponent />
                    <Content className="h-100 overflow-auto">
                        {children}
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<LayoutProps> = hoc(Component);
