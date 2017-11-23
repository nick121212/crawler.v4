import React, { SyntheticEvent, ReactText } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

import TextBox, { TextBoxProps } from "react-uwp/TextBox";
import Icon from "react-uwp/Icon";

export interface AntdInputNumberWidgetProps extends SchemaFormItemProps {
}

export class AntdInputNumberWidget extends React.Component<AntdInputNumberWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, validate, updateItemData, formItemData } = this.props;
        const { input = {} } = uiSchemaOptions.widget || {};
        const { input: inputDefault = {} } = globalOptions.widget || {};
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        return (
            <TextBox placeholder={mergeSchema.title}
                onChangeValue={(val: number) => {
                    updateItemData(val * 1);
                }}
                onBlur={(e: any) => {
                    validate(e.target.value * 1);
                }}
                type="number"
                {...input}
                {...inputDefault}
                {...this.setDefaultProps() } />
        );
    }

    private setDefaultProps(): TextBoxProps {
        const { mergeSchema } = this.props;
        const props: any = {};

        if (this.props.formItemData !== undefined) {
            props.value = this.props.formItemData;
        } else {
            props.value = 0;
        }

        return props;
    }
}
