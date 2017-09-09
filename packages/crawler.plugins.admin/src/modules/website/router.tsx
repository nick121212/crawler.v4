import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import { bundle } from "../../common/components";
import ListComponentWithHoc from "./components/list";
import CreateComponentWithHoc from "./components/create";

let bundleFunc = bundle;

if (__DEV__) {
    bundleFunc = (Compnent: any) => Compnent;
}

export class RouterComponent extends React.Component<any, any> {
    private previousLocation: Location;

    public componentWillUpdate(nextProps: any) {
        const { location } = this.props;

        if (
            nextProps.history.action !== "POP" &&
            (!location.state || !location.state.isModal)
        ) {
            this.previousLocation = this.props.location;
        }
    }

    public render() {
        const { location } = this.props;
        const isModal = !!(
            location.state &&
            location.state.isModal &&
            this.previousLocation !== location
        );

        if (!this.previousLocation) {
            this.previousLocation = location;
        }

        return (
            <Layout>
                {isModal ? <Route path="/settings/website/create" component={bundleFunc(CreateComponentWithHoc as any)} /> : null}
                <Switch location={isModal ? this.previousLocation : location}>
                    <Route exact path="/settings/website" component={bundleFunc(ListComponentWithHoc as any)}></Route>
                    {!isModal ? <Route path="/settings/website/create" component={bundleFunc(CreateComponentWithHoc as any)} /> : null}
                    <Redirect to="/settings/website" />
                </Switch>
            </Layout>
        );
    }
}
