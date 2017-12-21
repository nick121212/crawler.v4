import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { Tile } from "../../component/index";

export interface TileTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class TileTemp extends React.Component<TileTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});

        // console.log(tempOptions);

        return (
            <Tile {...tempOptions}>
                {children}
            </Tile>
        );
    }
}
