import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

// import { layout } from "../reducers";
// import { IProps } from "../constants/layout";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        layout: state.getIn(["app", "app", "layout"]),
        routing: state.get("routing"),
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    return {

    };
};

export const hoc = compose<any, any>(
    connect(mapStateToProps, mapDispatchToProps),
);
