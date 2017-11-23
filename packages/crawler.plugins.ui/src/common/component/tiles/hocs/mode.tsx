import React from "react";
import { withState, compose } from "recompose";

import { TileGroupCalcOutProps } from "./calc";

export interface TileGroupModeOutProps extends TileGroupCalcOutProps {
    container?: HTMLDivElement;
    updateEle?(ele: HTMLDivElement);
}


export default (Component: new () => React.Component<any, any>) => {
    @(compose<any, any>(withState("container", "updateEle", null)) as any)
    class Hoc extends React.PureComponent<TileGroupModeOutProps, any> {
        public render() {
            let props = {};

            if (this.props.container) {
                props = this.calcSize();
            }

            return <Component {...this.props} {...props} />;
        }

        private calcSize() {
            let { tileWidth, tileHeight, tileGutter, maxGrid, container, eleRes } = this.props;
            const { offsetHeight, offsetWidth } = container;

            if (tileWidth === "fixed") {
                tileWidth = (offsetWidth) / eleRes.columns - 2 * tileGutter;
            }
            if (tileHeight === "fixed") {
                tileHeight = (offsetHeight) / eleRes.rows - 2 * tileGutter;
            }

            return {
                maxGrid,
                tileHeight,
                tileWidth
            };
        }
    }

    return Hoc;
};
