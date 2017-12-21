import React from "react";
import { Layout, Menu, Icon, Breadcrumb, Row, Progress, Badge, Button } from "antd";
import { withRouter, Link, RouteComponentProps } from "react-router-dom";
import * as Immutable from "immutable";

import { BaseComponent } from "../../../common/component/base";
import { HeaderProps } from "./constant";
import { hoc } from "./container";
import { $$top, $$bottom } from "../../data";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, ItemGroup, Item } = Menu;

export class Component extends BaseComponent<HeaderProps & RouteComponentProps<any>, any> {
    public render() {
        return (
            <Header className="bg-white pl3" style={{ borderBottom: "1px solid #e9e9e9" }}>
                <div className="dt dt--fixed h-100">
                    <div className="dtc">
                        <Breadcrumb separator="|">
                            {this.getBreak()}
                        </Breadcrumb>
                    </div>
                    <div className="dtc tc"></div>
                    <div className="dtc tr">
                        <span className="dib mr2">Capicity 173/230</span>
                        <Progress className="dib mr2" style={{ width: 120 }} percent={30} />
                        <Badge count={5} dot>
                            <Icon type="message" />
                        </Badge>
                    </div>
                </div>
            </Header>
        );
    }

    private getMenuData(paths: string[]) {
        let node = $$top.concat($$bottom);
        let findNode;

        paths.forEach((path) => {
            if (!findNode && path !== "root") {
                node = node.findLast((val, key) => {
                    return val.get("key") === path;
                });

                findNode = node;
            }
        });

        return findNode;
    }

    private getBreak() {
        const { location } = this.props;
        const pathSnippets = location.pathname.split("/").splice(1);

        pathSnippets.length = 2;

        const extraBreadcrumbItems = pathSnippets.map((_, index) => {
            const paths = pathSnippets.slice(0, index + 1);
            const url = `/${paths.join("/")}`;
            const node = this.getMenuData(paths);

            if (!node) {
                return null;
            }

            return (
                <Breadcrumb.Item key={url} >
                    {
                        (index + 1 === pathSnippets.length) ? <span>{node.get("name")}</span> : <Link to={url}>
                            <span>{node.get("name")}</span>
                        </Link>
                    }
                </Breadcrumb.Item>
            );
        });

        const breadcrumbItems = [(
            <Breadcrumb.Item key="home">
                <Link to={"/"}>
                    <Icon type={"home"} />
                    <span>{"主页"}</span>
                </Link>
            </Breadcrumb.Item>
        )].concat(extraBreadcrumbItems);

        return breadcrumbItems;
    }
}

export const ComponentWithHoc: React.ComponentClass<HeaderProps> = hoc(withRouter(Component));
