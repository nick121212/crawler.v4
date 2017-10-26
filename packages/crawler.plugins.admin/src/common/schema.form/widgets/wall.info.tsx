import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-antd";

import { WallInfoProps, WallInfo } from "../../../modules/holoauto/components/wall.info";

export interface WallInfoWidgetProps extends SchemaFormItemProps {
}

export class WallInfoWidget extends React.Component<WallInfoWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, validate, updateItemData, formItemData } = this.props;
        const { wallInfo = { children: null } } = uiSchemaOptions.widget || {};
        const { wallInfo: wallInfoDefault = {} } = globalOptions.widget || {};
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        return (
            <WallInfo
                onChange={(ks: string) => {
                    updateItemData(ks);
                    validate(ks);
                }}
                disabled={readonly}
                {...wallInfo}
                {...wallInfoDefault}
                {...this.setDefaultProps() }>
                {wallInfo.children}
            </WallInfo>
        );
    }

    private setDefaultProps(): WallInfoProps {
        const { mergeSchema } = this.props;
        const props: WallInfoProps = {};

        if (this.props.formItemData !== undefined) {
            props.keys = this.props.formItemData;
        } else {
            props.keys = "";
        }

        return props;
    }
}
