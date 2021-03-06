import { combineReducers } from "redux-immutable";
import Immutable from "immutable";
import { syncHistoryWithStore } from "react-router-redux";
import immutableDevTools from "immutable-devtools";
import { EmptyActionCreator } from "redux-act";

import { historyInstance } from "./router";
import applyMiddlewares, { sagaMiddleware } from "./middleware";
import reactRouterReducer from "./router.reducer";

import * as settings from "../modules/settings";


// if (__DEV__) {
immutableDevTools(Immutable);
// }

let reducers = combineReducers({
    modules: combineReducers({
        settings: settings.reducer
    }),
    routing: reactRouterReducer
});

// setTimeout(() => {
//     messageModel.actions.push({ content: "测试错误信息1", status: "error" });
//     messageModel.actions.push({ content: "测试错误信息2", status: "error" });
//     messageModel.actions.push({ content: "测试错误信息3", status: "error" });
// }, 2000);

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

[].forEach((saga) => {
    sagaMiddleware.run(saga);
});

[...settings.actions].forEach((action: EmptyActionCreator) => {
    action.assignTo(store);
});
