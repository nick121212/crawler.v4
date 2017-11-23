import React from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";
import { Flex, Box } from "grid-styled";
import classNames from "classnames";

export interface AntdRowTempProps extends SchemaFormItemProps {
    tempKey: string;
}

export class AntdRowTemp extends React.Component<AntdRowTempProps, any> {
    public render(): JSX.Element {
        const { children, globalOptions, tempKey, uiSchemaOptions, mergeSchema } = this.props;
        const tempOptions = Object.assign({}, globalOptions[tempKey] || {}, uiSchemaOptions[tempKey] || {});

        return (
            <Flex {...tempOptions} className={classNames("relative", tempOptions.className)}>
                {children}
            </Flex>
        );
    }
}
