
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";

import { SchemaFormItemBaseProps, RC, ThemeHocOutProps } from "fx-schema-form-react";
import { mapFormItemDataProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";

export interface ExtraFieldHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, UtilsHocOutProps {

}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<ExtraFieldHocOutProps, any> => {
        class ComponentHoc extends React.PureComponent<ExtraFieldHocOutProps, any> {
            /**
             * render
             */
            public render(): JSX.Element {
                const { mergeSchema, currentTheme, formItemData } = this.props;
                let FieldComponent, props: any = {};

                if (formItemData && formItemData.field && currentTheme.fieldFactory.has(formItemData.field)) {
                    FieldComponent = currentTheme.fieldFactory.get(formItemData.field);
                }

                if (FieldComponent) {
                    props.FieldComponent = FieldComponent;
                }

                return <Component {...this.props} {...props} />;
            }
        }

        return compose(connect(mapFormItemDataProps), shouldUpdate(() => {
            return false;
        }))(ComponentHoc) as any;
    };
};
