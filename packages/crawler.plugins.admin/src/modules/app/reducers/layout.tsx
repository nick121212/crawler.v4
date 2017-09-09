


import { createAction, createReducer, SimpleActionCreator } from "redux-act";
import { Reducer } from "redux";
import * as Immutable from "immutable";

export interface ILayoutState {
    theme: string;
    collapsed: boolean;
}

export class LayoutReducer {
    private changeTheme: SimpleActionCreator<string> = createAction<string>("更改layout的色调");
    private toggleCollapsed: SimpleActionCreator<boolean> = createAction<boolean>("改变侧边栏的状态");

    constructor(private initialState: ILayoutState) { }

    public get actions(): {
        changeTheme: SimpleActionCreator<string>,
        toggleCollapsed: SimpleActionCreator<boolean>,
    } {
        return {
            changeTheme: this.changeTheme,
            toggleCollapsed: this.toggleCollapsed
        };
    }

    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.changeTheme as any]: (state: Immutable.Map<string, any>, payload: string) => state.set("theme", payload),
            [this.toggleCollapsed as any]: (state: Immutable.Map<string, any>, payload: boolean) => state.set("collapsed", payload)
        }, Immutable.Record(this.initialState)());
    }
}
