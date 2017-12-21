

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { ModelProxyMiddlewareMeta, ModelProxyAction } from "../middlewares/proxy";
import { Reducer } from "redux";
import { IExecute } from "modelproxy/out/models/execute";
import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import Immutable from "immutable";

/**
 * 发起接口请求的reducer
 * actions
 * push 放入message进堆栈
 * pop  删除一条message
 */
export class MessageReducer<T> {
    private push: SimpleActionCreator<T> = createAction<T>("添加消息进堆栈");
    private pop: EmptyActionCreator = createAction("删除消息");

    /**
     * 返回当前的actions
     */
    public get actions() {
        return {
            push: this.push,
            pop: this.pop
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.List<any>> {
        return createReducer<Immutable.List<any>>({
            [this.push as any]: (state: Immutable.List<any>, payload: any) => {
                return state.push(payload);
            },
            [this.pop as any]: (state: Immutable.List<any>, payload: any) => {
                return state.pop();
            }
        }, Immutable.fromJS([]));
    }
}
