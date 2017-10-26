import React from "react";
import { Row, Col, Button, Icon, Avatar } from "antd";
import { Link, Route } from "react-router-dom";

import { BaseComponent, DropOptionComponent } from "../../../common/components";
import { MenuComponent } from "./menu";

import cls from "../styles/header.scss";

export class HeaderComponent extends BaseComponent<any, any> {

    private menus = [
        { key: "help", name: "帮助", icon: "question-circle-o", onMenuClick: console.log },
        { key: "divider", name: "" },
        { key: "logout", name: "退出登录", icon: "logout", onMenuClick: console.log },
    ];

    public render(): JSX.Element {
        let { children } = this.props;

        return (
            <Row type="flex" justify="space-between">
                <Col>
                    <Icon className={`v-mid white ${cls["anticon-spin-slow"]}`} spin={true} type="Crawler_socialgover" style={{ fontSize: 32, marginRight: 10 }} />
                    <h3 className="white fr">NODEJS爬虫</h3>
                </Col>
                <Col>
                    <div className="fl" style={{ marginRight: 30 }}>
                        <Route render={({ location, history }) => {
                            return <MenuComponent collapsed={true} theme={""} history={history} location={location} />;
                        }}></Route>
                    </div>
                    <DropOptionComponent currentItem={{}} menuOptions={this.menus} button={
                        <div className="v-mid fr">
                            <Avatar icon="user" className="v-mid"></Avatar>
                            <span className="white">  crawler</span>
                        </div>
                    } />
                </Col>
            </Row>
        );
    }
}
