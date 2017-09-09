

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { Reducer } from "redux";
import * as Immutable from "immutable";

import { ModelProxyMiddlewareMeta } from "../middlewares/modelproxy";
import { ITableProps } from "../components";

export interface ICrudListState {
    options: ITableProps;
    currentPage: number;
    limit: number;
    params?: any;
}

export class CrudListReducer {
    private setPaginaton: SimpleActionCreator<{ page: number, limit: number }> = createAction<{ page: number, limit: number }>("设置分页信息");
    private setParams: SimpleActionCreator<any> = createAction<any>("设置搜索参数的值");

    constructor(private initialState: ICrudListState) { }

    public get actions(): {
        setPaginaton: SimpleActionCreator<{ page: number, limit: number }>,
        setParams: SimpleActionCreator<any>
    } {
        return {
            setPaginaton: this.setPaginaton,
            setParams: this.setParams
        };
    }

    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.setPaginaton as any]: (state: Immutable.Map<string, any>) => state.updateIn(["data"], (data: { page: number, limit: number }) => {
                return state.merge({
                    currentPage: data.page,
                    limit: data.limit
                });
            }),
            [this.setParams as any]: (state: Immutable.Map<string, any>) => state.updateIn(["data"], (params: any) => {
                return state.update("params", params);
            })
        }, Immutable.Record(this.initialState)());
    }
}
