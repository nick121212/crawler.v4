import { combineReducers } from "redux-immutable";
import * as Immutable from "immutable";
import { syncHistoryWithStore } from "react-router-redux";
import { createHashHistory } from "history";

import applyMiddlewares, { sagaMiddleware } from "./middlewares";
import routerReducer from "../common/reducers/router";
import { ModelProxyReducer } from "../common/reducers/modelproxy";
import { historyInstance } from "./routers";

// import { appReducer } from "../modules/app/index";
// import { websiteReducer, sagas } from "../modules/website";

import * as settings from "../modules/settings";
import * as partten from "../modules/partten";
// import * as holoauto from "../modules/holoauto";


let reducers = combineReducers({
    app: combineReducers({
        settings: settings.reducer,
        partten: partten.reducer,
        // holoauto: holoauto.reducer
    }),
    routing: routerReducer
});

/**
 * 合并reducers
 * 创建store对象
 */
export const store = applyMiddlewares(historyInstance)(reducers, Immutable.Map());


/**
 * 使用了Immutable，这里对react-router-redux特殊处理下
 */
export const history = syncHistoryWithStore(historyInstance as any, store, {
    selectLocationState(state: Immutable.Map<string, any>) {
        return state.get("routing").toJS();
    }
});

[...settings.sagas, ...partten.sagas].forEach((saga) => {
    sagaMiddleware.run(saga);
});

