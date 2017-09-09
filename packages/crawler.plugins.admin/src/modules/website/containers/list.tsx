import { bindActionCreators, Dispatch } from "redux";

import { connect } from "react-redux";
import { compose, withHandlers, lifecycle } from "recompose";
import * as Immutable from "immutable";

import { IProps } from "../constants/list";
import { listData, list } from "../reducers/list";

export const mapStateToProps = (state: Immutable.Map<string, any>, ownProps: IProps) => {
    return {
        list: state.getIn(["app", "website", "list", "list"]).toJS(),
        listData: state.getIn(["app", "website", "list", "listData"]).toJS()
    };
};

export const mapDispatchToProps = (dispatch: Dispatch<any>, ownProps: IProps) => {
    if (!list.actions.setPaginaton.assigned()) {
        list.actions.setPaginaton.assignTo(dispatch);
        list.actions.setParams.assignTo(dispatch);

        listData.actions.execute.assignTo(dispatch);
    }

    return {
        changeTheme: (checked: boolean) => {
            console.log("");
        }
    };
};

export const hoc = compose<IProps, any>(
    connect(mapStateToProps, mapDispatchToProps),
    withHandlers({
        fetchData: (props: IProps) => {
            return () => {
                listData.actions.execute({
                    params: { a: 1 }
                }, { ns: "webapi", key: "website" });
            };
        },
        setPagination: (props: IProps) => {
            return (page: number, limit: number) => {
                console.log(page, limit);
            };
        }
    }),
    lifecycle<IProps, any>({
        componentDidMount: function () {
            this.props.fetchData();
        }
    }));
