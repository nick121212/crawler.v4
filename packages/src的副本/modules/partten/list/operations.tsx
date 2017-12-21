import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";
import { compose } from "recompose";

export class Component extends React.PureComponent<any, any> {
    public render(): any {
        let { execute, fetchModel } = this.props;
        let { loading } = fetchModel;

        return (
            <Button onClick={execute.bind(this)}
                loading={loading}
                className="mr1" type="primary" shape="circle" icon="reload" />
        );
    }
}

