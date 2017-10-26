import React, { SyntheticEvent } from "react";
import { SchemaFormItemProps } from "fx-schema-form-antd";

import { WallDetailInfo, WallDetailInfoProps } from "../../../modules/holoauto/components/wall.detail.info";

export interface WallDetailInfoWidgetProps extends SchemaFormItemProps {
}

export class WallDetailInfoWidget extends React.Component<WallDetailInfoWidgetProps, any> {

    public render(): JSX.Element {
        const { mergeSchema, globalOptions, uiSchemaOptions, validate, updateItemData, formItemData } = this.props;
        const { wallDetailInfo = {} } = uiSchemaOptions.widget || {};
        const { wallDetailInfo: wallDetailInfoDetault = {} } = globalOptions.widget || {};
        const { uiSchema = {}, keys } = mergeSchema;
        const { readonly = false } = uiSchema as any;

        return (
            <WallDetailInfo
                onChange={(ks: string) => {
                    updateItemData(ks);
                    validate(ks);
                }}
                disabled={readonly}
                {...wallDetailInfo}
                {...wallDetailInfoDetault}
                {...this.setDefaultProps() }>
            </WallDetailInfo>
        );
    }

    private setDefaultProps(): WallDetailInfoProps {
        const { mergeSchema, formData } = this.props;
        const props: WallDetailInfoProps = {};

        if (this.props.formItemData !== undefined) {
            props.keys = this.props.formItemData;
        } else {
            props.keys = "";
        }

        props.width = formData.width || 0;
        props.length = formData.length || 0;
        props.height = formData.height || 0;

        return props;
    }
}
