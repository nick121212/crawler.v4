import { Dispatch } from "redux";

import { connect } from "react-redux";
import { batch } from "redux-act";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { MainComponentProps, reducerKeys } from "../constants/main";
import { fetchModel, deleteModel } from "../reducers/main";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetch: state.getIn(reducerKeys.concat(["fetch"])),
        remove: state.getIn(reducerKeys.concat(["remove"])),
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    // fetchModel.init(dispatch);
    // deleteModel.init(dispatch);

    return {
        executeAction: async () => {
            await dispatch(fetchModel.actions.execute({
                data: {
                    "parttern": "role:crawler.plugin.webapi,cmd:list",
                    "config": {}
                }
            }, { ns: "webapi", key: "act" }));
        },
        removeItemAction: async (data: any, idx: number) => {
            let result: any = await dispatch(deleteModel.actions.execute({
                data: {
                    "parttern": "role:crawler.plugin.webapi,cmd:remove",
                    "config": data
                }
            }, { ns: "webapi", key: "act" }));

            if (!result.error) {
                dispatch(fetchModel.actions.removeItem(idx));
            }
        }
    };
};

export const hoc = compose<MainComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: MainComponentProps) => {
            return () => {
                props.executeAction();
            };
        },
        removeItem: (props: MainComponentProps) => {
            return async (data: any, idx: number) => {
                await props.removeItemAction(data, idx);

                // fetchModel.actions.removeItem(idx);
            };
        }
    })
);

export const mainHoc = compose<MainComponentProps, any>(
    hoc,
    lifecycle<MainComponentProps, any>({
        componentDidMount: function () {
            const { loading, loaded } = this.props.fetch;

            if (loading || loaded) {
                return;
            }

            this.props.execute();
        }
    })
);
