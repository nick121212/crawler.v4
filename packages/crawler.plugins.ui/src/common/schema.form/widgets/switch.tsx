import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-react";

import Toggle, { ToggleProps } from "react-uwp/Toggle";


export interface AntdSwitchProps extends SchemaFormItemProps {
}

export class AntdSwitchWidget extends React.Component<AntdSwitchProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, arrayIndex, globalOptions, uiSchemaOptions, meta, validate, updateItemData } = this.props;
        const { switch: switcho = {} } = uiSchemaOptions.widget || {};
        const { switch: switchDefault = {} } = globalOptions.widget || {};
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        // return (
        //     <Switch onChange={(checked: boolean) => {
        //         updateItemData(checked);
        //         validate(checked);
        //     }}
        //         disabled={readonly}
        //         {...switchDefault}
        //         {...switcho}
        //         {...this.setDefaultProps() }></Switch >
        // );

        return (
            <Toggle label={mergeSchema.title}
                onToggle={(checked: boolean) => {
                    updateItemData(checked);
                    validate(checked);
                }}
                {...switchDefault}
                {...switcho}
                {...this.setDefaultProps() } />
        );
    }

    private setDefaultProps(): ToggleProps {
        const { mergeSchema } = this.props;
        const props: ToggleProps = {};

        if (this.props.formItemData !== undefined) {
            props.checked = this.props.formItemData;
            props.defaultToggled = this.props.formItemData;
        } else {
            props.defaultToggled = mergeSchema.default;
        }

        return props;
    }
}
