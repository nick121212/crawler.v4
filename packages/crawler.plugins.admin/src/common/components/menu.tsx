import React from "react";
import { Menu, Icon } from "antd";

export interface INode {
    title?: string;
    key?: string;
    id: number;
    name: string;
    icon?: string;
    sub?: Array<INode>;
    depth?: number;
}

export interface IProps {
    nodes: Array<INode>;
    collapsed?: boolean;
    openAll?: boolean;
    itemComponentRender?: (key: string, node: INode, Children: any) => JSX.Element;
}

/**
 * 生成无限极树形结构菜单组件
 * 递归给出的数据
 * 自动计算当前的路由对应的菜单
 */
export class MenusComponent extends React.Component<IProps & any, any> {
    private currentKey: string;
    private currentNode: INode;
    private openKeys: Array<string> = [];

    /**
         * 渲染组件
         */
    public render(): JSX.Element {
        const { nodes, collapsed, location, history, ...menuOptions } = this.props;
        let menus: Array<JSX.Element> = [];

        this.openKeys = [];
        if (nodes && nodes.length) {
            nodes.forEach((n: INode) => {
                n.depth = 1;
            });
            menus = this.renderMenu({
                id: 0,
                key: "root",
                name: "root",
                sub: nodes
            });
        }

        // if (this.currentNode) {
        //     history.replaceState({
        //         pathname: ,
        //         state: { fromDashboard: true }
        //     });
        // }

        return (
            <Menu {...menuOptions} onOpenChange={this.onOpenChange.bind(this)} defaultOpenKeys={this.openKeys} selectedKeys={[this.currentKey]}>
                {menus}
            </Menu>
        );
    }

    /**
     * 生成Menu.SubMenu
     * @param node      {INode}                     单个数据节点
     * @param children  {Array<Subitem|SubMenu>}    节点所需的子节点
     */
    private renderSubMenus(node: INode, children: any) {
        const { collapsed, openAll } = this.props;
        let showTitle = true;

        if (collapsed) {
            showTitle = !node.depth || node.depth > 1;
        }

        if (openAll && node.key) {
            this.openKeys.push(node.key);
        }

        return (<Menu.SubMenu uniqueKey={node.key} key={node.key} title={
            <span>
                <Icon type={node.icon || "file"} />
                {showTitle && <span>{node.title || node.name}</span>}
            </span>
        }>
            {children}
        </Menu.SubMenu>);
    }

    /**
     * 生成MenuItem
     * @param node {INode} 单个数据节点
     */
    private renderMenuItem(node: INode, parentNode?: INode) {
        let { key = "" } = parentNode || {};
        let currentKey = `${(parentNode && parentNode.key) ? parentNode.key + "/" : ""}${node.key}`;
        let isOpen = false;
        let { itemComponentRender } = this.props;

        if ("/" + currentKey === this.props.location.pathname) {
            this.currentKey = currentKey;
            this.currentNode = node;

            if (!this.openKeys.filter((openKey: string) => {
                return openKey === key;
            }).length) {
                this.openKeys.push(key);
                isOpen = true;
            }
        }

        if (isOpen && this.props.history && this.props.history.location) {
            this.props.history.location.state = node;
            // this.props.history.replace({ pathname: this.props.location.pathname, state: node });
        }

        return {
            isOpen: isOpen,
            node: itemComponentRender ? (<Menu.Item key={currentKey}>
                {itemComponentRender(`/${currentKey}`, this.currentNode || node,
                    <span>
                        <Icon type={node.icon || "file"} />
                        {node.title || node.name}
                    </span>)}
            </Menu.Item>) : (<Menu.Item key={currentKey}>
                <Icon type={node.icon || "file"} />
                {node.title || node.name}
            </Menu.Item>)
        };
    }

    /**
     * 递归生成所需的所有子节点
     * @param node {INode} 单个数据节点
     */
    private renderMenu(node: INode, parentNode?: INode) {
        let menus: Array<JSX.Element> = [];
        let { key = "" } = parentNode || {};

        if (node.sub && node.sub.length) {
            node.sub.forEach((n: INode) => {
                if (n.sub && n.sub.length) {
                    menus.push(this.renderSubMenus(n, this.renderMenu(n, node)));
                } else {
                    let res = this.renderMenuItem(n, node);

                    if (res.isOpen) {
                        this.openKeys.push(key);
                    }
                    menus.push(res.node);
                }
            });
        } else {
            let res = this.renderMenuItem(node, parentNode);

            if (res.isOpen) {
                this.openKeys.push(key);
            }
            menus.push(res.node);
        }

        return menus;
    }

    private onOpenChange(openKeys: Array<string>) {
        this.openKeys = openKeys;
    }
}
