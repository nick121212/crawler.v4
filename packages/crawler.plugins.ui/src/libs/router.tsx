import React from "react";
import { TransitionGroup } from "react-transition-group";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Immutable from "immutable";
import { createHashHistory, History } from "history";

import { MainLayoutComponent } from "../modules/main";
import { SettingLayoutComponent } from "../modules/settings";

/**
 * 返回history的实例
 */
export const historyInstance: History = createHashHistory({ basename: "/" });

/**
 * 路由元素
 */
export default (
    <Router>
        <MainLayoutComponent>
            <Switch>
                <Route component={SettingLayoutComponent} />
                <Redirect from="/" to="/" />
            </Switch>
        </MainLayoutComponent>
    </Router>
);
