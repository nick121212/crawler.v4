import React from "react";
import { Button, Popover, Popconfirm } from "antd";

export class ItemButtons extends React.PureComponent<any, any> {
    public render() {
        const { isShow = true } = this.props.meta;

        return (
            <div>
                <Button style={{ marginRight: 5 }} type="primary" shape="circle" icon="plus" ghost={true}
                    onClick={() => { this.props.addItem(); }}></Button>
                <Button type={!isShow ? "dashed" : "primary"}
                    shape="circle" icon={isShow ? "shrink" : "arrows-alt"}
                    onClick={() => { this.props.toggleItem(); }}></Button>
            </div>
        );
    }
}

export class ItemChildButtons extends React.PureComponent<any, any> {
    public render() {
        const { index, removeItem, switchItem } = this.props;
        const { isShow = true } = this.props.meta;

        return (
            <Popover placement="topLeft" title={null} content={(
                <div>
                    <Popconfirm
                        style={{ marginRight: 5 }}
                        title="确定要删除么"
                        onConfirm={() => {
                            removeItem(index);
                        }}
                        okText="Yes"
                        cancelText="No">
                        <Button ghost={true} type="danger" shape="circle" icon="delete"></Button>
                    </Popconfirm>
                    <Button style={{ marginRight: 5, marginLeft: 5 }}
                        ghost={false} type="dashed" shape="circle" icon="arrow-up"
                        onClick={() => { switchItem(index, index - 1); }}></Button>
                    <Button ghost={false} type="dashed" shape="circle" icon="arrow-down"
                        onClick={() => { switchItem(index, index + 1); }}></Button>
                </div>
            )} trigger="hover">
                <Button icon="info-circle" shape="circle"></Button>
            </Popover>
        );
    }
}
