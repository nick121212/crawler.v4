import React from "react";
import classNames from "classnames";
import { SchemaFormItemProps } from "fx-schema-form-react";
import Image from "react-uwp/Image";

export interface ImageTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class ImageTemp extends React.Component<ImageTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});

        return <Image
            {...tempOptions}>
        </Image>;
    }
}
