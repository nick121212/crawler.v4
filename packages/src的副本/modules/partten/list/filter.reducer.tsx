

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { Reducer } from "redux";
import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import Immutable from "immutable";

/**
 * 发起接口请求的reducer
 * actions
 * loading 发起loading的action
 * success 发起请求成功的action
 * error   发起请求失败的action
 * execute 发起请求的action
 */
export class FilterGroupReducer {

    private setGroup: SimpleActionCreator<string> = createAction<string>("设置当前的搜索group");

    /**
     * 构造函数
     * @param initialState state的初始值
     */
    constructor(protected initialState: any) { }

    /**
     * 返回当前的actions
     */
    public get actions() {
        return {
            setGroup: this.setGroup
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.setGroup as any]: (state: Immutable.Map<string, any>, payload: string = "") => {
                return state.set("filterGroup", payload);
            }
        }, this.initialState);
    }
}
