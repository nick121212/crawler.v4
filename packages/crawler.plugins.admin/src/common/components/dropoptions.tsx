import React from "react";
import { Dropdown, Button, Icon, Menu } from "antd";
import { ButtonProps } from "antd/lib/button/button";
import { ClickParam } from "antd/lib/menu";

export interface IMenuOptionItem extends ButtonProps {
    key: string;
    name?: string;
    render?: (menuItem: IMenuOptionItem) => JSX.Element;
    onMenuClick?: (currentItem: any, item: IMenuOptionItem) => void;
}

export interface IProps {
    /**
     * dropDownItem点击事件
     */
    onMenuClick?: (clickParams: any) => void;
    /**
     * dropDownItem元素集合
     */
    menuOptions: Array<IMenuOptionItem>;
    /**
     * 按钮的样式
     */
    buttonStyle?: Object;
    /**
     * dropdown的样式
     */
    dropdownProps?: Object;
    /**
     * 当前的项目
     */
    currentItem: any;
    /**
     * 自定义按钮
     */
    button?: any;
    /**
     * 是否可用
     */
    disabled?: boolean;

}

/**
 * dropdown组件
 * 对antd中的Dropdown做了二次封装
 */
export class DropOptionComponent extends React.Component<IProps, any> {
    public render(): JSX.Element {
        const { menuOptions, onMenuClick, dropdownProps, buttonStyle, currentItem, button, disabled } = this.props;
        // 产出dropdown的子元素
        const menus = menuOptions.map((menuItem: IMenuOptionItem) => {
            if (menuItem.key === "divider") {
                return (
                    <Menu.Divider key={Date.now().toString()} />
                );
            }
            return (
                <Menu.Item disabled={disabled} key={menuItem.key}>

                    {
                        menuItem.render ? menuItem.render(menuItem) : <span>
                            {menuItem.icon && <Icon style={{ margin: 5 }} type={menuItem.icon} />}
                            {menuItem.name}
                        </span>
                    }


                </Menu.Item>
            );
        });

        let proxyClick = ({ key }: ClickParam) => {
            menuOptions.forEach((menuItem: IMenuOptionItem) => {
                if (menuItem.key === key && menuItem.onMenuClick) {
                    menuItem.onMenuClick(currentItem, menuItem);
                }
            });
        };

        return (
            <Dropdown overlay={<Menu onClick={onMenuClick || proxyClick} {...dropdownProps}>{menus}</Menu>}>
                {
                    button || <Button style={{ border: "none", ...buttonStyle }} disabled={disabled}>
                        <Icon style={{ marginRight: 2 }} type="bars" />
                        <Icon type="down" />
                    </Button>
                }
            </Dropdown>);
    }
}
