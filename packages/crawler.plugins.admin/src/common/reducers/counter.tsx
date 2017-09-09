

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator, types, loggers } from "redux-act";
import { ModelProxyMiddlewareMeta } from "../middlewares/modelproxy";
import { Reducer } from "redux";
import * as Immutable from "immutable";

export interface ICounterState {
    data: number;
}

export class CounterReducer {
    private add: SimpleActionCreator<number> = createAction<number>("增加一定的值，payload为增加的值");
    private increment: EmptyActionCreator = createAction("增加state的值");
    private decrement: EmptyActionCreator = createAction("减少state的值");

    constructor(private initialState: ICounterState) { }

    public get actions(): {
        add: SimpleActionCreator<number>,
        decrement: EmptyActionCreator,
        increment: EmptyActionCreator
    } {
        return {
            add: this.add,
            decrement: this.decrement,
            increment: this.increment,
        };
    }

    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.increment as any]: (state: Immutable.Map<string, any>) => state.updateIn(["data"], (data: number) => {
                return data + 1;
            }),
            [this.decrement as any]: (state: Immutable.Map<string, any>) => state.updateIn(["data"], (data: number) => {
                return data - 1;
            }),
            [this.add as any]: (state: Immutable.Map<string, any>, payload: number) => {
                return state.updateIn(["data"], (data: number) => {
                    return data + payload;
                });
            }
        }, Immutable.Record(this.initialState)());
    }
}
