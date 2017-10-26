

import { createAction, createReducer, EmptyActionCreator, SimpleActionCreator, ComplexActionCreator } from "redux-act";
import { Reducer } from "redux";
import * as Immutable from "immutable";

import { LayoutComponentProps, initialState } from "../constants/layout";

export class LayoutReducer {
    private isInit = false;
    private setChain: SimpleActionCreator<any> = createAction<any>("修改当前链表中的元素");
    private popChain: SimpleActionCreator<any> = createAction<any>("重置当前chain");
    // private Chain: SimpleActionCreator<any> = createAction<any>("重置当前chain");

    private setCurBuilding: SimpleActionCreator<any> = createAction<any>("设置当前的building");
    private setCurRoom: SimpleActionCreator<any> = createAction<any>("设置当前的room");
    private setCurProjector: SimpleActionCreator<any> = createAction<any>("设置当前的projector");

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

    public get actions(): {
        setChain: SimpleActionCreator<any>,
        popChain: SimpleActionCreator<any>,
        setCurBuilding: SimpleActionCreator<any>,
        setCurRoom: SimpleActionCreator<any>,
        setCurProjector: SimpleActionCreator<any>,
    } {
        return {
            setChain: this.setChain,
            popChain: this.popChain,
            setCurBuilding: this.setCurBuilding,
            setCurRoom: this.setCurRoom,
            setCurProjector: this.setCurProjector
        };
    }

    public get reducer(): Reducer<Immutable.Map<string, any>> {
        return createReducer<Immutable.Map<string, any>>({
            [this.setChain as any]: (state: Immutable.Map<string, any>, chain: any) => {
                return state.merge({
                    chain
                });
            },
            [this.popChain as any]: (state: Immutable.Map<string, any>) => {
                let chain = state.get("chain").toJSON();

                if (chain.length > 1) {
                    chain.pop();
                }

                return state.merge({
                    chain
                });
            },
            [this.setCurBuilding as any]: (state: Immutable.Map<string, any>, data: any) => {
                let chain = state.get("chain").toJSON();

                chain.length = 1;
                chain.push(data.component);

                return state.merge({
                    chain,
                    curRoom: null,
                    curBuild: data.build
                });
            },
            [this.setCurRoom as any]: (state: Immutable.Map<string, any>, data: any) => {
                let chain = state.get("chain").toJSON();

                chain.length = 2;
                chain.push(data.component);

                return state.merge({
                    chain,
                    curRoom: data.room
                });
            },
            [this.setCurProjector as any]: (state: Immutable.Map<string, any>, data: any) => {
                let chain = state.get("chain").toJSON();

                chain.length = 3;
                chain.push(data.component);

                return state.merge({
                    chain,
                    curProjector: data.projector
                });
            }
        }, Immutable.Record(initialState)());
    }
}

export const layoutModel = new LayoutReducer();
