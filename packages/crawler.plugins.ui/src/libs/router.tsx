import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Immutable from "immutable";
import { createHashHistory, History } from "history";

import { ComponentWithHoc } from "../modules/main";
import { ComponentWithHoc as ParttenComponent } from "../modules/patten";

/**
 * 返回history的实例
 */
export const historyInstance: History = createHashHistory({ basename: "/" });

/**
 * 路由元素
 */
export default (
    <Router>
        <ComponentWithHoc>
            <Switch>
                <Route component={ParttenComponent} />
                <Redirect from="/" to="/root/setting" />
            </Switch>
        </ComponentWithHoc>
    </Router>
);
