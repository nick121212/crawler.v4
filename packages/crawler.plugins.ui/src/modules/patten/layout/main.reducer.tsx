

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { Reducer } from "redux";
import Immutable from "immutable";

export class LayoutMainReducer {

    private setOperations: SimpleActionCreator<JSX.Element> = createAction<JSX.Element>("设置当前的搜索group");

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
            setOperations: this.setOperations
        };
    }

    /**
     * 返回当前的reducers
     */
    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.setOperations as any]: (state: Immutable.Map<string, any>, payload: JSX.Element = null) => {
                return state.set("operations", payload);
            }
        }, this.initialState);
    }
}
