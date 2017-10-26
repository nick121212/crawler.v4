import React from "react";
import { Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { LayoutComponentProps } from "../constants/layout";
import { RoomProps } from "../constants/rooms";
import { fetchModel } from "../reducers/rooms";
import { layoutModel } from "../reducers";
import { RoomEditComponentWithHoc } from "../components/room.edit";
import { WallsComponentWithHoc } from "../components/walls";
import { ProjectorEditComponentWithHoc } from "../components/projector.edit";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: any) => {
    return {
        fetch: state.getIn(["app", "holoauto", "room"]),
        building: state.getIn(["app", "holoauto", "layout", "curBuild"]),
        room: state.getIn(["app", "holoauto", "layout", "curRoom"]),
        layout: state.getIn(["app", "holoauto", "layout"])
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: any) => {
    if (!fetchModel.actions.execute.assigned()) {
        fetchModel.actions.execute.assignTo(dispatch);
    }
    return {
        setBuildingEditChain: (chain: any[]) => {
            layoutModel.actions.setChain(chain);
        }
    };
};

export const hoc = compose<RoomProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        execute: (props: RoomProps) => {
            return () => {
                fetchModel.actions.execute({
                    params: {
                        buildId: props.building.get("buildId")
                    }
                }, { ns: "holoauto", key: "room-query" });
            };
        },
        setRoomEditChainHandle: (props: RoomProps & LayoutComponentProps) => {
            return (chain: any) => {
                let curChain = props.layout.get("chain");

                if (!curChain) {
                    console.error("没有chain信息！");
                }
                curChain = curChain.toJSON();
                curChain.length = 2;
                curChain.push(<RoomEditComponentWithHoc />);

                layoutModel.actions.setChain(curChain);
            };
        },
        changeSelectRoomHandle: (props: RoomProps & LayoutComponentProps) => {
            return (data: any) => {
                layoutModel.actions.setCurRoom({ room: data, component: <WallsComponentWithHoc key={data.roomId + "WallsComponentWithHoc"} /> });
            };
        },

    })
);

export const mainHoc = compose<RoomProps, any>(
    hoc,
    lifecycle<RoomProps, any>({
        componentDidMount: function () {
            const { loading, loaded } = this.props.fetch;

            // if (loading || loaded) {
            //     return;
            // }

            this.props.execute();
        }
    })
);
