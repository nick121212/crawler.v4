import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import { ComponentWithHoc as MainLayoutComponent } from "./layout";
import { MenuComponent } from "./menu";

/**
 * 路由元素
 */
export default class Component extends React.PureComponent<any, any> {
    public render() {
        return <div>
            <Route component={MainLayoutComponent} />
            <Route component={MenuComponent} />
        </div>;
    }
}

