

import { createAction, assignAll, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { ModelProxyMiddlewareMeta, ModelProxyAction } from "../middlewares/modelproxy";
import { Reducer } from "redux";
import { IExecute } from "modelproxy/out/models/execute";
import { takeEvery, takeLatest, put, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import * as Immutable from "immutable";

/**
 * 当前reducer的数据结构
 */
export interface IModelProxyState<T> {
    /**
     * 是否在请求中
     */
    loading?: boolean;
    /**
     * 请求是否成功
     */
    loaded?: boolean;
    /**
     * 请求返回的数据
     */
    data?: T | null;
    /**
     * 请求失败的错误信息
     */
    error?: Error | null;
}

export interface ModelProxyActions<T> {
    error: SimpleActionCreator<Error>;
    execute: ComplexActionCreator<IExecute, ModelProxyMiddlewareMeta>;
    loading: SimpleActionCreator<boolean>;
    success: SimpleActionCreator<T>;
}

/**
 * 发起接口请求的reducer
 * actions
 * loading 发起loading的action
 * success 发起请求成功的action
 * error   发起请求失败的action
 * execute 发起请求的action
 */
export class ModelProxyReducer<T> {
    private isInit = false;

    private loading: SimpleActionCreator<boolean> = createAction<boolean>("modelproxy开始loading的action");
    private success: SimpleActionCreator<T> = createAction<T>("modelproxy成功的action");
    private error: SimpleActionCreator<Error> = createAction<Error>("modelproxy失败的action");
    private execute: ComplexActionCreator<any, ModelProxyMiddlewareMeta>
    = createAction<IExecute, ModelProxyMiddlewareMeta>("发起接口请求", (options: IExecute) => options, (options: IExecute, meta: ModelProxyMiddlewareMeta) => meta);

    /**
     * 构造函数
     * @param initialState state的初始值
     */
    constructor(protected initialState: IModelProxyState<T> = {
        data: null,
        error: null,
        loaded: false,
        loading: false,
    }) { }

    /**
     * saga拦截action
     * 这里拦截execute
     * 如果error=true，发起error
     * 如果error=false，发起success
     */
    public * saga() {
        yield takeEvery(this.execute.getType(), this.fetch.bind(this));
    }

    public init(dispatch: any) {
        if (this.isInit) {
            return;
        }

        this.isInit = true;
        for (let key in this.actions) {
            if (this.actions.hasOwnProperty(key)) {
                let element = this.actions[key];

                if (!element.assigned() && ["success", "error"].indexOf(key) === -1) {
                    element.assignTo(dispatch);
                }
            }
        }
    }

    /**
     * 返回当前的actions
     */
    public get actions(): ModelProxyActions<T> {
        return {
            error: this.error,
            execute: this.execute,
            loading: this.loading,
            success: this.success,
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.loading as any]: (state: Immutable.Map<string, any>, payload: boolean = true) => {
                return state.set("loading", payload);
            },
            [this.success as any]: (state: Immutable.Map<string, any>, payload: T) => {
                return state.merge({ loading: false, data: payload, loaded: true, error: null });
            },
            [this.error as any]: (state: Immutable.Map<string, any>, payload: Error) => {
                return state.merge({ loading: false, data: null, loaded: false, error: payload });
            },
            [this.execute as any]: (state: Immutable.Map<string, any>) => {
                return state.set("loading", true);
            }
        }, Immutable.Record(this.initialState)());
    }

    /**
     * 拦截execute action后执行的方法
     * @param action 当前被拦截的action
     */
    private *fetch(action: ModelProxyAction) {
        console.log("execute action call;;;;");
        // yield delay(2000);
        if (action.error) {
            yield put(this.error(action.payload));
        } else {
            yield put(this.success(action.payload));
        }
    }
}
