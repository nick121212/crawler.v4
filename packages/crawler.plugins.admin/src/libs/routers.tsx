import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import * as Immutable from "immutable";
import { createHashHistory, History } from "history";

import { LayoutComponent } from "../modules/app";
import { RouterComponent as WebsiteRoute } from "../modules/website";

/**
 * 路由元素
 */
export default (
    <Router>
        <LayoutComponent>
            <Switch>
                <Route path="/settings/website*" component={WebsiteRoute} />
            </Switch>
        </LayoutComponent>
    </Router>
);

export const historyInstance: History = createHashHistory({ basename: "/" });
