import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { Flex, Box } from "grid-styled";
import classNames from "classnames";

export interface ColTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class ColTemp extends React.Component<ColTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, mergeSchema, tempKey, uiSchemaOptions } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});

        return (
            <Box {...tempOptions} className={classNames("relative", tempOptions.className)}>
                {children}
            </Box>
        );
    }
}
