import { combineReducers } from "redux-immutable";
import * as Immutable from "immutable";

import { ModelProxyReducer, ModelProxyActions } from "../../../common/reducers/modelproxy";
import { SimpleActionCreator, createAction, createReducer, Reducer, batch } from "redux-act";

/**
 * 扩展fetch的reducer
 *  1. 加入新的action，removeAction
 */
class FetchReducer<T> extends ModelProxyReducer<T> {
    private removeItem: SimpleActionCreator<any> = createAction<any>("删除掉已经删除的数据");

    public get actions(): ModelProxyActions<any> & { removeItem: SimpleActionCreator<any>; } {
        return Object.assign({}, super.actions, {
            removeItem: this.removeItem
        });
    }

    public get reducer() {
        const originReducer: any = super.reducer;

        originReducer.on(this.removeItem, (state: Immutable.Map<string, any>, payload: number) => {
            return state.removeIn(["data", payload]);
        });

        return originReducer;
    }
}

export let fetchModel = new FetchReducer();
export let deleteModel = new ModelProxyReducer();

// fetchModel.reducer.on(batch, (state, payload) => payload.reduce(fetchModel.reducer, state));
fetchModel.reducer.on(batch, (state, action) => action.payload.reduce(fetchModel.reducer, state));

export default combineReducers({
    fetch: fetchModel.reducer,
    remove: deleteModel.reducer
});
