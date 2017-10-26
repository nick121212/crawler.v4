import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";

import { BaseComponent } from "../../../common/components";

import cls from "../styles/layout.scss";

const { Sider } = Layout;

export class LayoutComponent extends BaseComponent<any, any> {
    public render(): JSX.Element {
        let { children, layout: layoutInfo, changeTheme = (checked: boolean) => checked } = this.props;

        return (
            <span>爬虫总览</span>
        );
    }
}

export const LayoutComponentWithHoc = (LayoutComponent);
