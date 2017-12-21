import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, } from "recompose";
import Immutable from "immutable";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        messages: state.getIn(["messages"])
    };
};

export const hoc = compose(connect(mapStateToProps));

