import React from "react";
import IconButton from "react-uwp/IconButton";
import CommandBar from "react-uwp/CommandBar";
import AppBarButton, { DataProps as AppBarButtonProps } from "react-uwp/AppBarButton";

export class ItemButtons extends React.PureComponent<any, any> {
    public render() {
        const { mergeSchema } = this.props;
        const { isShow = true } = this.props.meta;
        const { uiSchema, title } = mergeSchema;

        return (
            <div className="mb4">
                <CommandBar
                    className="ma1"
                    content={title || uiSchema.title}
                    primaryCommands={[
                        <AppBarButton icon="Add" label="添加元素" onClick={() => { this.props.addItem(); }} />,
                        <AppBarButton icon={!isShow ? "ChevronDown3Legacy" : "ChevronUp3Legacy"}
                            label={"显示隐藏"}
                            onClick={() => { this.props.toggleItem(); }} />,
                    ]}>
                </CommandBar>
            </div>
        );
    }
}

export class ItemChildButtons extends React.PureComponent<any, any> {
    public render() {
        const { index, removeItem, switchItem, mergeSchema } = this.props;
        const { isShow = true } = this.props.meta;
        const { uiSchema, title } = mergeSchema;

        return (
            <CommandBar
                content={title || uiSchema.title}
                primaryCommands={[
                    <AppBarButton icon="Remove" onClick={() => { removeItem(index); }} />,
                    <AppBarButton icon="ChevronUp3Legacy" onClick={() => { switchItem(index, index - 1); }} />,
                    <AppBarButton icon="ChevronDown3Legacy" onClick={() => { switchItem(index, index + 1); }} />,
                ]}
            >
            </CommandBar>
        );
    }
}
