import React from "react";
import { Layout, Menu, Button, Slider, Icon, Spin, Alert, Switch, Row, Col } from "antd";
import { Route, Link } from "react-router-dom";
import classNames from "classnames";
import Animate from "rc-animate";

import { BaseComponent } from "../../../common/components";

import cls from "../styles/layout.scss";
import { hoc } from "../containers/layout";
import { WallInfo } from "./wall.info";

export class LayoutComponent extends BaseComponent<any, any> {
    public render(): JSX.Element {
        let { children, layout } = this.props;
        let chain = layout.get("chain");
        let span = 24 / 3;
        let startIndex = chain.size - 3;

        return (
            <div className="dt dt--fixed h-100">
                {
                    chain.map((component: any, index: number) => {
                        if (index >= startIndex) {
                            return <div className="dtc tc animated bounceInLeft " key={component.get("key")}>
                                <div className="h-100 overflow-auto" style={{ borderRight: "1px solid #e5e5e5" }}>
                                    {component.toJSON()}
                                </div>
                            </div>;
                        }
                        return null;
                    })
                }
            </div>
        );
    }
}

export const LayoutComponentWithHoc = hoc(LayoutComponent);
