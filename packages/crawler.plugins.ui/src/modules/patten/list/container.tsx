import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";
import { Button } from "antd";

import { ContentProps } from "./constant";
import { fetchModel, filterGroup } from "./reducer";
import { hoc as layoutHoc } from "../layout/container";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetchModel: state.getIn(["modules", "partten", "content", "list"]),
        filter: state.getIn(["modules", "partten", "content", "filter"])
    };
};

export const hoc = compose<ContentProps, any>(
    connect(mapStateToProps),
    layoutHoc,
    withHandlers({
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
        setFilterGroup: (props: ContentProps) => {
            return (group: string) => {
                filterGroup.actions.setGroup(group);
            };
        }
    }),
    lifecycle<ContentProps, any>({
        componentWillUnmount: function () {
            const { setOperations } = this.props;

            setOperations(null);
        },
        componentDidMount: function () {
            const { setOperations, execute } = this.props;
            const { loading, loaded } = this.props.fetchModel;

            setOperations(<Button onClick={execute.bind(this)}
                loading={loading}
                className="mr1" type="primary" shape="circle" icon="reload" />);

            if (loading || loaded) {
                return;
            }

            this.props.execute();
        }
    })
);

