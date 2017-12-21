import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";

export interface DivTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class DivTemp extends React.Component<DivTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});

        return <div {...tempOptions} className={classNames("relative", tempOptions.className)}>
            {children}
        </div>;
    }
}
