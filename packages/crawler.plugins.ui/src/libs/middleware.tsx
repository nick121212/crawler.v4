import { createLogger } from "redux-logger";
import createSagaMiddleware from "redux-saga";
import promise from "redux-promise";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import his, { createBrowserHistory, createHashHistory, History } from "history";

import proxy from "./proxy";
import mpMiddleware, { ModelProxyMiddlewareMeta } from "../common/middlewares/proxy";

/**
 * logger中间件
 */
export const logger = createLogger({
    collapsed: true,
    duration: true,
    stateTransformer: (state) => {
        return state.toJS();
    }
});

/**
 * saga中间件
 * 用于处理action产生的不良影响
 */
export const sagaMiddleware = createSagaMiddleware();

/**
 * 合并中间件
 * 
 */
export default (history: any) => applyMiddleware(thunk, routerMiddleware(history), promise, mpMiddleware({ proxy }), sagaMiddleware, logger, promise)(createStore);
