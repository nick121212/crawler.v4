

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { Reducer } from "redux";
import * as Immutable from "immutable";

import { ModelProxyMiddlewareMeta } from "../middlewares/modelproxy";
import { ITableProps } from "../components";

export interface ICrudFormState {
    item?: any;
    formData?: any;

    schema: any;
    uiSchema: any;
    globalOptions: any;
}

export class CrudFormReducer {
    private setFormData: SimpleActionCreator<any> = createAction<any>("formData赋值");

    constructor(private initialState: ICrudFormState) { }

    public get actions(): {
        setFormData: SimpleActionCreator<any>
    } {
        return {
            setFormData: this.setFormData
        };
    }

    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.setFormData as any]: (state: Immutable.Map<string, any>) => state.updateIn(["data"], (data: any) => {
                return state.merge({
                    formData: data,
                });
            })
        }, Immutable.Record(this.initialState)());
    }
}
