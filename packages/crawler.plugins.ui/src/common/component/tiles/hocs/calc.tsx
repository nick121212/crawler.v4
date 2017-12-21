import React from "react";
import { withState, compose } from "recompose";

import { TileGroupColumnOutProps } from "./column";
import { TileGroupRowOutProps } from "./row";

export interface TileGroupCalcOutProps extends TileGroupRowOutProps, TileGroupColumnOutProps {
    direction?: "row" | "column";
    tileWidth?: number | "fixed";
    tileHeight?: number | "fixed";
    tileGutter?: number;
    maxGrid?: number;
    eleRes?: {
        elements: any;
        rows: number;
        columns: number;
    };
}

export default (Component: new () => React.Component<any, any>) => {
    class Hoc extends React.PureComponent<TileGroupCalcOutProps, any> {
        public render() {
            let { direction, calcColumn, calcRow, maxGrid, tileWidth, tileHeight } = this.props, eleRes;

            if (direction === "row") {
                eleRes = calcRow(maxGrid || 1, tileWidth as number, tileHeight as number);
            } else {
                eleRes = calcColumn(maxGrid || 1, tileWidth as number, tileHeight as number);
            }

            return <Component eleRes={eleRes} {...this.props} />;
        }
    }

    return Hoc;
};
