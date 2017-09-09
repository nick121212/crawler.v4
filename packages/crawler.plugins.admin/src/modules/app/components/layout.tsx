import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { IProps } from "../constants/layout";
import { hoc } from "../containers/layout";
import { HeaderComponent } from "./header";
import { MenuComponent } from "./menu";
import { BaseComponent } from "../../../common/components";

import cls from "../index.scss";

const { Sider } = Layout;

export class LayoutComponent extends BaseComponent<IProps, any> {
    public render(): JSX.Element {
        let { children, layout: layoutInfo, changeTheme = (checked: boolean) => checked } = this.props;

        return (
            <Layout>
                <Layout.Header className={cls.header}>
                    <Route component={HeaderComponent}></Route>
                </Layout.Header>
                <Layout>
                    <Sider className={"overflow-hidden bg-white " + cls.silder}
                        breakpoint="lg"
                        collapsedWidth="0"
                        collapsible
                        collapsed={layoutInfo.collapsed}
                        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}>
                        <div className={cls.layout_sider}>
                            <Route render={({ location, history }) => {
                                return <MenuComponent theme={layoutInfo.theme} history={history} location={location} />;
                            }}></Route>
                        </div>
                        <div className={classNames(cls.menu_footer, "dn")}>
                            <Switch checkedChildren="开" unCheckedChildren="关" onChange={(checked: boolean) => {
                                console.log(checked);
                                changeTheme(checked);
                            }} />
                        </div>
                    </Sider>

                    <Layout style={{ marginLeft: 0 }}>
                        {children}
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}

export const LayoutComponentWithHoc = hoc(LayoutComponent);
