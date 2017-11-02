import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutProps } from "./constant";
import { layoutMainReducer } from "./reducer";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        layoutExtraProps: state.getIn(["modules", "partten", "layout", "main"])
    };
};

export const hoc = compose<LayoutProps, any>(
    connect(mapStateToProps),
    withHandlers({
        setOperations: (props: LayoutProps) => {
            return (element: JSX.Element) => {
                layoutMainReducer.actions.setOperations(element);
            };
        }
    })
);

