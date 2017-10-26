import { Dispatch } from "redux";

import { connect } from "react-redux";
import { batch } from "redux-act";
import { compose, withHandlers, lifecycle, pure } from "recompose";
import * as Immutable from "immutable";
import { SchemaFormCreate } from "fx-schema-form-antd";

import { CreateComponentProps, reducerKeys, schemaKey } from "../constants/create";
import { submitModel, schemaForm } from "../reducers/create";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        submitModel: state.getIn(reducerKeys.concat(["submitModel"])),
        schemaForm: state.getIn(reducerKeys.concat(["schemaForm"])),
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    return {
        submitForm: async (data: any) => {
            console.log(data);
            alert("submit form");
            // await dispatch(submitModel.actions.execute({
            //     data: {
            //         "parttern": "role:crawler.plugin.webapi,cmd:list",
            //         "config": {}
            //     }
            // }, { ns: "webapi", key: "act" }));
        }
    };
};

export const hoc = compose<CreateComponentProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        submitForm: (props: CreateComponentProps) => {
            return async (data: any) => {
                let metaData = SchemaFormCreate.metas[schemaKey];

                schemaForm.actions.updateMetaState({ isLoading: true, isValid: false });
                schemaForm.actions.updateMetaState({
                    isLoading: false,
                    meta: await metaData.validateAll(data)
                });
                if (metaData.data.isValid) {
                    props.submitForm(data);
                }
            };
        }
    }),
    pure
);
