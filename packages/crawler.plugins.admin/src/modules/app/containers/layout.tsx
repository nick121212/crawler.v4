import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { layout } from "../reducers";
import { IProps } from "../constants/layout";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: IProps) => {
    return {
        layout: state.getIn(["app", "app", "layout"]),
        routing: state.get("routing"),
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IProps) => {
    return {
        changeTheme: (checked: boolean) => {
            dispatch(layout.actions.changeTheme(checked ? "dark" : "light"));
        }
    };
};

export const hoc = compose<IProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    // withHandlers({

    // }),
    // lifecycle({
    //     componentDidMount: function () {
    //     }
    // })
);
