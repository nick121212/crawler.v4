import React from "react";
import { Row, Col, Button, Icon, Avatar } from "antd";
import { Link } from "react-router-dom";

import { BaseComponent, DropOptionComponent } from "../../../common/components";
import cls from "../index.scss";

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
                    <div className={cls.logo}></div>
                </Col>
                <Col>
                    <DropOptionComponent currentItem={{}} menuOptions={this.menus} button={
                        <div className="v-mid">
                            <Avatar icon="user" className="v-mid"></Avatar>
                            <span className="white">  crawler</span>
                        </div>
                    } />
                </Col>
            </Row>
        );
    }
}
