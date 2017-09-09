import { combineReducers } from "redux-immutable";
import * as Immutable from "immutable";
import { syncHistoryWithStore } from "react-router-redux";
import { createHashHistory } from "history";

import applyMiddlewares, { sagaMiddleware } from "./middlewares";
import { LayoutComponent } from "../modules/app/index";
import routerReducer from "../common/reducers/router";
import { CounterReducer } from "../common/reducers/counter";
import { ModelProxyReducer } from "../common/reducers/modelproxy";
import { historyInstance } from "./routers";

import { appReducer } from "../modules/app";
import { websiteReducer, sagas } from "../modules/website";

/**
 * 合并reducers
 * 创建store对象
 */
export const store = applyMiddlewares(historyInstance)(combineReducers({
    app: combineReducers({
        app: appReducer,
        website: websiteReducer
    }),
    routing: routerReducer
}), Immutable.Map());

/**
 * 使用了Immutable，这里对react-router-redux特殊处理下
 */
export const history = syncHistoryWithStore(historyInstance as any, store, {
    selectLocationState(state: Immutable.Map<string, any>) {
        return state.get("routing").toJS();
    }
});

sagas.forEach((saga) => {
    sagaMiddleware.run(saga);
});

