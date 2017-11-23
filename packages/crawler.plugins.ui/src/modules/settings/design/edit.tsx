

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { Reducer } from "redux";
import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import Immutable from "immutable";

/**
 * 发起接口请求的reducer
 * actions
 * push 放入message进堆栈
 * pop  删除一条message
 */
export class EditReducer<T> {
    private setCurrentEditForm: SimpleActionCreator<T> = createAction<T>("当前的编辑表单");

    /**
     * 返回当前的actions
     */
    public get actions() {
        return {
            setCurrentEditForm: this.setCurrentEditForm
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.setCurrentEditForm as any]: (state: Immutable.Map<string, any>, payload: any) => {
                return state.merge(payload);
            },
        }, Immutable.fromJS({}));
    }
}
