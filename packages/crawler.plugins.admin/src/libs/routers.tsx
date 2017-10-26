import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Immutable from "immutable";
import { createHashHistory, History } from "history";

import { LayoutComponentWithHoc } from "../modules/main";
import { LayoutComponentWithHoc as SettingLayoutComponent } from "../modules/settings";
import { LayoutComponentWithHoc as ParttenLayoutComponent } from "../modules/partten";
import { LayoutComponentWithHoc as SummaryLayoutComponent } from "../modules/summary";
// import { LayoutComponentWithHoc as HoloLayoutComponent } from "../modules/holoauto";

/**
 * 返回history的实例
 */
export const historyInstance: History = createHashHistory({ basename: "/" });

/**
 * 路由元素
 */
export default (
    <Router>
        <LayoutComponentWithHoc>
            <Switch>
                <Route component={ParttenLayoutComponent} path="/root/partten" />
                <Route component={SettingLayoutComponent} path="/root/setting" />
                <Route component={SummaryLayoutComponent} path="/root/summary" />
                {/* <Route component={HoloLayoutComponent} path="/root/holoauto" /> */}
                <Redirect from="/" to="/root/setting" />
            </Switch>
        </LayoutComponentWithHoc>
    </Router>
);
