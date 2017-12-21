import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

export interface AntdFormItemTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class AntdFormItemTemp extends React.Component<AntdFormItemTempProps, any> {
    public render(): JSX.Element {
        const { children, arrayIndex, ItemButtons, mergeSchema, globalOptions = {}, tempKey, uiSchemaOptions,
            meta = { dirty: false, isValid: true, isLoading: false }
        } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});
        const { hasFeedback = false } = tempOptions;
        let props: any = {};
        let { dirty, isValid, errorText = "", isLoading = false } = meta;

        if (dirty) {
            props.validateStatus = !isValid ? "error" : "success";
        }

        if (isLoading) {
            props.validateStatus = "validating";
        }

        return (
            <div className="measure ma1">
                <label className="f6 b db mb2">
                    {mergeSchema.title || [].concat(mergeSchema.keys).pop()}
                    {mergeSchema.isRequired ? <span className="normal black-60">(required)</span> : null}
                </label>
                {children}
                {mergeSchema.description ?
                    <small id="name-desc" className="f6 black-60 db mb2">{mergeSchema.description}</small> : null}
                {isValid ? null : <small id="name-desc" className="f6 red-60 db mb2">{errorText}</small>}
            </div>
        );
    }
}
