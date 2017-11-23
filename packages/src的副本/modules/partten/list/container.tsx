import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";
import { Button } from "antd";

import { ContentProps } from "./constant";
import { fetchModel, filterGroup } from "./reducer";
import { hoc as layoutHoc } from "../layout/container";

import { Component } from "./operations";

/**
 * 提取partten中的list数据
 * @param state    state
 * @param ownProps props
 */
export const mapStateToPropsForOperation = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetchModel: state.getIn(["modules", "partten", "content", "list"])
    };
};

/**
 * 提取搜索条件数据
 * @param state    state
 * @param ownProps props
 */
export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        filter: state.getIn(["modules", "partten", "content", "filter"])
    };
};

/**
 * 操作方法
 */
export const handlers = withHandlers({
    /**
     * 调用节点，获取节点的信息
     */
    execute: (props: ContentProps) => {
        return () => {
            fetchModel.actions.execute({
                data: {
                    "parttern": "role:mesh,get:members",
                    "config": {}
                }
            }, { ns: "webapi", key: "act" });
        };
    },
    /**
     * 设置当前的搜索group
     */
    setFilterGroup: (props: ContentProps) => {
        return (group: string) => {
            filterGroup.actions.setGroup(group);
        };
    }
});

export const hoc = compose<ContentProps, any>(
    connect(mapStateToProps),
    connect(mapStateToPropsForOperation),
    layoutHoc,
    handlers,
    lifecycle<ContentProps, any>({
        /**
         * unmount钩子
         * 删除当前layout中的操作按钮
         */
        componentWillUnmount: function () {
            const { setOperations } = this.props;

            setOperations(null);
        },
        /**
         * mount 钩子
         * 加入操作按钮
         * 载入数据到页面中
         */
        componentDidMount: function () {
            const { setOperations } = this.props;
            const { loading, loaded } = this.props.fetchModel;
            const ComponentWithHoc = compose<any, any>(connect(mapStateToPropsForOperation), handlers)(Component);

            setOperations(<ComponentWithHoc />);

            if (loading || loaded) {
                return;
            }

            this.props.execute();
        }
    })
);

