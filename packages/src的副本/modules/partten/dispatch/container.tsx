import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import Immutable from "immutable";

import { ContentProps } from "./constant";
import { submitModel } from "./reducer";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        result: state.getIn(["modules", "partten", "test", "result"]),
        schemaForm: state.getIn(["modules", "partten", "test", "schemaForm"])
    };
};

export const hoc = compose<ContentProps, any>(
    connect(mapStateToProps),
    withHandlers({
        execute: (props: ContentProps) => {
            return (schemaForm: any) => {
                let data = schemaForm.data;

                submitModel.actions.execute({
                    data: {
                        parttern: data.partten,
                        config: JSON.parse(data.config)
                    }
                }, { ns: "webapi", key: "act" });
            };
        }
    }),
    lifecycle<ContentProps, any>({
    })
);

