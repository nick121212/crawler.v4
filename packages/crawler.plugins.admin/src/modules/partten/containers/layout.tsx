import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { fetchModel } from "../reducers/main";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetch: state.getIn(["app", "partten", "main"]),
        routing: state.get("routing")
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    return {

    };
};

export const hoc = compose<LayoutComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
);
