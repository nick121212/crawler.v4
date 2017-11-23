import React from "react";
import { connect } from "react-redux";
import { nsFactory, SchemaForm, SchemaFormItemProps, RC } from "fx-schema-form-react";
import TreeView, { TreeItem } from "react-uwp/TreeView";
import Icon from "react-uwp/Icon";

export interface TreeFieldProps extends SchemaFormItemProps {

}

/**
 * 数组字段的生成规则
 */

// @(compose(connect(mapFormItemDataProps), onlyUpdateForKeys(["formItemData"])) as any)
export class TreeField extends React.PureComponent<TreeFieldProps, any> {
    /**
     * 渲染页面
     */
    public render(): JSX.Element | null {
        const { mergeSchema, currentTheme, WidgetComponent, schemaKey, globalOptions, schemaFormOptions, formItemData
            , arrayIndex, getCurrentState, arrayLevel, getFieldOptions
        } = this.props;
        const { uiSchema, title } = mergeSchema;
        const { data = {} } = formItemData;

        return <TreeView
            iconDirection={"left"}
            className="tree-field w-100 h-100"
            itemHeight={32}
            background={"none"}
            headerIcon={<Icon style={{ fontSize: 48 / 3 }}>FolderLegacy</Icon>}
            itemIcon={<Icon style={{ fontSize: 48 / 3 }}>OpenFileLegacy</Icon>}
            listSource={formItemData as TreeItem[]}
            showFocus />;
    }
}
