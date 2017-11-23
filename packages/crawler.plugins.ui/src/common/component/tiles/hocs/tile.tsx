import React from "react";
import { withState, compose } from "recompose";

export interface TileOutProps {
    container?: HTMLDivElement;
    updateEle?(ele: HTMLDivElement);
}


export default (Component: new () => React.Component<any, any>) => {
    @(compose<any, any>(withState("container", "updateEle", null)) as any)
    class Hoc extends React.PureComponent<any, any> {
        public render() {
            return <Component {...this.props} />;
        }
    }

    return Hoc;
};
