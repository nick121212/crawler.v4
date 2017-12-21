import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { TileGroup } from "../../component/index";

export interface TileGroupTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class TileGroupTemp extends React.Component<TileGroupTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});
        let childs = children && (children.constructor === Array ? children : [children]);

        // console.log(children);

        return (
            <TileGroup {...tempOptions} tiles={children ? childs : []} />
        );
    }
}
