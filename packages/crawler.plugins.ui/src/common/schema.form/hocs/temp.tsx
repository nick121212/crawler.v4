
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";

export interface ExtraTempHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, UtilsHocOutProps {

}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {
    temp: "",
    children: null
}) => {
    return (Component: any): RC<ExtraTempHocOutProps, any> => {
        @connect(mapFormItemDataProps)
        class ComponentHoc extends React.PureComponent<ExtraTempHocOutProps, any> {
            /**
             * render
             */
            public render(): any {
                const { currentTheme, mergeSchema, formItemData, globalOptions, children } = this.props;
                const { data = {} } = formItemData;
                const { uiSchema } = mergeSchema;

                if (!currentTheme.tempFactory.has(settings.temp)) {
                    return children || null;
                }

                let Temp = currentTheme.tempFactory.get(settings.temp);

                if (!mergeSchema.uiSchema) {
                    mergeSchema.uiSchema = {
                        options: {}
                    };
                }
                mergeSchema.uiSchema.options = {
                    [settings.temp]: data
                };

                return <Temp globalOptions={globalOptions}
                    tempKey={settings.temp}
                    uiSchemaOptions={uiSchema.options}
                    {...this.props}>
                    {settings.children ? settings.children : <Component {...this.props} />}
                </Temp>;
            }
        }

        return ComponentHoc as any;
    };
};
