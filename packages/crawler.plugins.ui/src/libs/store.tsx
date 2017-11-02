import { combineReducers } from "redux-immutable";
import * as Immutable from "immutable";
import { syncHistoryWithStore } from "react-router-redux";
import immutableDevTools from "immutable-devtools";
import { EmptyActionCreator } from "redux-act";

import { historyInstance } from "./router";
import applyMiddlewares, { sagaMiddleware } from "./middleware";
import reactRouterReducer from "./router.reducer";

// import { ModelProxyReducer } from "../common/reducers/modelproxy";
// import { historyInstance } from "./routers";

import * as partten from "../modules/patten";

if (__DEV__) {
    immutableDevTools(Immutable);
}

let reducers = combineReducers({
    modules: combineReducers({
        partten: partten.reducer
    }),
    routing: reactRouterReducer
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

[...partten.sagas].forEach((saga) => {
    sagaMiddleware.run(saga);
});

[...partten.actions].forEach((action: EmptyActionCreator) => {
    action.assignTo(store);
});
