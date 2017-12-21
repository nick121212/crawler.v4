
import React from "react";
import { compose, shouldUpdate } from "recompose";
import { connect } from "react-redux";

import {
    SchemaFormItemBaseProps, RC,
    ThemeHocOutProps, UtilsHocOutProps, ArrayHocOutProps
} from "fx-schema-form-react";
import { mapFormItemDataProps, mapMetaStateToProps } from "fx-schema-form-react/libs/hocs/select";
import { BaseFactory } from "fx-schema-form-core";
// import { UtilsHocOutProps } from "fx-schema-form-react/libs/hocs/item/utils";
import CommandBar from "react-uwp/CommandBar";
import AppBarButton from "react-uwp/AppBarButton";
import AppBarSeparator from "react-uwp/AppBarSeparator";

export interface OptHocOutProps extends SchemaFormItemBaseProps, ThemeHocOutProps, ArrayHocOutProps, UtilsHocOutProps {
    actions?: any;
}

/**
 * hoc
 * @param hocFactory  hoc的工厂方法
 * @param Component 需要包装的组件
 */
export default (hocFactory: BaseFactory<any>, settings: any = {}) => {
    return (Component: any): RC<OptHocOutProps, any> => {
        @connect(mapMetaStateToProps)
        class ComponentHoc extends React.PureComponent<OptHocOutProps, any> {
            public render(): any {
                let { mergeSchema, getFieldOptions, getHocOptions, children,
                    formItemData, actions, arrayIndex, toggleItem, meta = {}, arrayLevel } = this.props;
                let { keys } = mergeSchema;
                let { field = "" } = formItemData || {};
                let options = getHocOptions("opt");
                let data = getFieldOptions(field);

                if (field) {
                    data = Object.assign({}, data || {}, formItemData);
                }

                if (!field) {
                    return <Component {...this.props} />;
                }

                return [
                    data.opt === false ? null :
                        <div style={{ left: 0, zIndex: 999 }}
                            className={"absolute hide-child"} key={keys.join("-") + "1"}>
                            <div className={meta.isShow ? "child" : ""}>
                                <CommandBar
                                    isMinimal={false}
                                    flowDirection="row-reverse"
                                    content={data.title + "-" + arrayLevel.length}
                                    labelPosition="right"
                                    primaryCommands={[
                                        <AppBarButton icon="Delete" label="删除" onClick={() => {
                                            let pKeys = keys.concat([]);

                                            pKeys.pop();
                                            actions.removeItem({ keys: pKeys, index: arrayIndex });
                                        }} />,
                                        <AppBarButton icon="Edit" label="编辑" onClick={() => {
                                            if (options.onClick) {
                                                // toggleItem();
                                                options.onClick(data, this.props);
                                            }
                                        }} />,
                                    ]} />
                            </div>
                        </div>,
                    <Component key={keys.join("-") + "2"} {...this.props} />
                ];
            }
        }

        return ComponentHoc as any;
    };
};
