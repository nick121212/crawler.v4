import React, { SyntheticEvent } from "react";

import TextBox, { TextBoxProps } from "react-uwp/TextBox";
import Icon from "react-uwp/Icon";

import { SchemaFormItemProps } from "fx-schema-form-react";

export interface AntdInputWidgetProps extends SchemaFormItemProps {
}

export class AntdInputWidget extends React.Component<AntdInputWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, validate, updateItemData, formItemData } = this.props;
        const { input = {} } = uiSchemaOptions.widget || {};
        const { input: inputDefault = {} } = globalOptions.widget || {};
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        return (
            <TextBox placeholder={mergeSchema.title}
                onChangeValue={(val: string) => {
                    updateItemData(val);
                }}
                onBlur={(e: any) => {
                    validate(e.target.value);
                }}
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
            props.value = "";
        }

        return props;
    }
}
