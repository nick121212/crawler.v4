import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Card } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";
import QueueAnim from "rc-queue-anim";

import { BaseComponent } from "../../../common/components";
import { LayoutComponentProps } from "../constants/layout";

import cls from "../styles/layout.scss";
import { hoc } from "../containers/layout";
import { hoc as MainHoc } from "../containers/main";

import { MainComponentWithHoc } from "./main";
import { MainComponentProps } from "../constants/main";

export class LayoutComponent extends BaseComponent<LayoutComponentProps & MainComponentProps, any> {
    public render(): JSX.Element {
        let { location, execute, fetch } = this.props;
        const { loaded, loading } = fetch;

        return (
            <Card className="card-has-scroll" title={
                <div>
                    <Icon type={location.state.icon} />
                    {location.state.name}
                </div>
            } noHovering bordered={false} extra={
                <Button loading={loading} onClick={execute.bind(this)} shape="circle" icon="reload" />
            }>
                <MainComponentWithHoc />
            </Card>
        );
    }
}

export const LayoutComponentWithHoc = hoc(MainHoc(LayoutComponent));
