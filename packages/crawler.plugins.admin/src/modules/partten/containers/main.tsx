import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { MainComponentProps } from "../constants/main";
import { fetchModel } from "../reducers/main";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetch: state.getIn(["app", "partten", "main"])
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    if (!fetchModel.actions.execute.assigned()) {
        fetchModel.actions.execute.assignTo(dispatch);
    }
    return {

    };
};

export const hoc = compose<MainComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: MainComponentProps) => {
            return () => {
                fetchModel.actions.execute({
                    data: {
                        "parttern": "role:mesh,get:members",
                        "config": {}
                    }
                }, { ns: "webapi", key: "act" });
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
