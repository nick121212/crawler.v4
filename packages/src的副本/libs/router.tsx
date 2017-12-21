import React from "react";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import * as Immutable from "immutable";
import { createHashHistory, History } from "history";

import { ComponentWithHoc } from "../modules/main";
import { ComponentWithHoc as ParttenComponent } from "../modules/partten";
import { ComponentWithHoc as MessageComponent } from "../modules/message";
import { ComponentWithHoc as DesignComponent } from "../modules/design";

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
            <MessageComponent />
            <Switch>
                <Route path="/root/partten" component={ParttenComponent} />
                <Route path="/" component={DesignComponent} />
                <Redirect from="/" to="/" />
            </Switch>
        </ComponentWithHoc>
    </Router>
);
