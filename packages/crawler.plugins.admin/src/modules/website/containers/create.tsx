import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { IProps } from "../constants/create";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: IProps) => {
    return {
        form: state.getIn(["app", "website", "create", "form"]).toJS(),
        formData: state.getIn(["app", "website", "create", "formData"]).toJS()
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IProps) => {
    return {

    };
};

export const hoc = compose<IProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({

    }),
    lifecycle({
        componentDidMount: function () {
            console.log("mount");
        }
    }));
