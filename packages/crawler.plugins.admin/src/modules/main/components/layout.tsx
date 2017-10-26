import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { HeaderComponent } from "./header";
import { BaseComponent } from "../../../common/components";

import cls from "../styles/layout.scss";
import { hoc } from "../containers/layout";

const { Sider } = Layout;

export class LayoutComponent extends BaseComponent<any, any> {
    public render(): JSX.Element {
        let { children, layout: layoutInfo, changeTheme = (checked: boolean) => checked } = this.props;

        return (
            <Layout>
                <Layout.Header className={cls.header}>
                    <Route component={HeaderComponent}></Route>
                </Layout.Header>
                <Layout.Content className={`${cls.content} h-100`}>
                    {children}
                </Layout.Content>
            </Layout>
        );
    }
}

export const LayoutComponentWithHoc = hoc(LayoutComponent);
