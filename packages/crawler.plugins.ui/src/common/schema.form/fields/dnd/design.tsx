import React from "react";
import * as ReactDOM from "react-dom";
import { connect } from "react-redux";
import { nsFactory, SchemaForm, SchemaFormItemProps, RC, hocFactory } from "fx-schema-form-react";
import Image from "react-uwp/Image";
import { Flex, Box } from "grid-styled";
import { compose, onlyUpdateForKeys, shouldUpdate, pure } from "recompose";

export interface DesignFieldProps extends SchemaFormItemProps {

}

/**
 * 数组字段的生成规则
 */
export class DesignField extends React.PureComponent<DesignFieldProps, any> {
    /**
     * 遍历数据，生成子表单
     * @param idx 数组的索引
     */
    private renderItem(idx: number, maxLen: number): JSX.Element {
        const { mergeSchema, schemaKey, globalOptions, schemaFormOptions,
            getCurrentState, ItemChildButtons, arrayLevel = [], arrayIndex, currentTheme, formItemData,
            getFieldOptions } = this.props;
        const { uiSchema, keys } = mergeSchema;
        const { data = {} } = formItemData;

        return (
            <SchemaForm
                key={keys.concat([idx]).join("/")}
                arrayIndex={idx}
                schemaFormOptions={schemaFormOptions}
                getCurrentState={getCurrentState}
                schemaKey={schemaKey}
                arrayLevel={arrayLevel.concat([idx])}
                schema={mergeSchema}
                parentKeys={mergeSchema.originKeys}
                RootComponent={({ children }) => {
                    return children;
                }}
                uiSchema={[{ key: mergeSchema.originKeys.concat(["children/-"]).join("/") }]}
                {...(formItemData.children[idx].data || {}) }
                globalOptions={globalOptions}>
            </SchemaForm>
        );
    }

    /**
     * 渲染页面
     */
    public render(): JSX.Element | null {
        const { mergeSchema, currentTheme, WidgetComponent, schemaKey, globalOptions, schemaFormOptions, formItemData
            , arrayIndex, getCurrentState, arrayLevel, getFieldOptions, children
        } = this.props;
        const { uiSchema, title, keys } = mergeSchema;
        const { data = {}, fieldTemp } = formItemData;
        let ComponentWithTemp;
        let child = formItemData && formItemData.children && formItemData.children.map((d: any, idx: number) => {
            return this.renderItem(idx, formItemData.children.length);
        });

        ComponentWithTemp = () => {
            return [children, child || null];
        };

        if (fieldTemp) {
            ComponentWithTemp = hocFactory.get("extraTemp")({
                temp: fieldTemp,
                children: [children, child || null]
            })(ComponentWithTemp);
        }

        return <ComponentWithTemp {...this.props} />;
    }
}
