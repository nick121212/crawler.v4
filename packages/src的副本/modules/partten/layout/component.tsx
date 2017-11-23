import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Card, Row, Col } from "antd";
import { Route, Link, Switch } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent, MenusComponent } from "../../../common/component";
import { LayoutProps } from "./constant";
import { hoc } from "./container";

import { ListComponentWithHoc } from "../list/component";
import { TestComponentWithHoc } from "../dispatch/component";

import { $$partten } from "../../data";

let menuProps = {
    collapsed: true,
    openAll: true,
    itemComponentRender: (key: string, currentNode: any, children: Array<JSX.Element>) => {
        if (location.pathname === key) {
            return children;
        }
        return <Link to={{ pathname: key, state: currentNode }}>{children}</Link>;

    },
    mode: "horizontal",
    theme: "light"
};


export class Component extends BaseComponent<LayoutProps, any> {
    public render(): JSX.Element {
        const { location, layoutExtraProps } = this.props;

        return (
            <Layout className="h-100 overflow-hidden">
                <Layout.Header className="bg-white pl0" style={{
                    borderBottom: "1px solid #e9e9e9"
                }}>
                    <Row type="flex">
                        <Col span={12}>
                            <MenusComponent
                                location={location}
                                history={history}
                                nodes={$$partten.toJS()}
                                {...menuProps} />
                        </Col>
                        <Col span={12} className="tr">
                            {layoutExtraProps.get("operations")}
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content className="h-100 overflow-auto">
                    <Switch>
                        <Route path="/root/:mode/list" component={ListComponentWithHoc} />
                        <Route path="/root/:mode/test" component={TestComponentWithHoc} />
                    </Switch>
                </Layout.Content>
            </Layout>
        );
    }
}

export const ComponentWithHoc = hoc(Component);
