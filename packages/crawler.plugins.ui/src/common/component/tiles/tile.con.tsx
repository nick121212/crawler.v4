import React from "react";
import classNames from "classnames";
import Icon from "react-uwp/Icon";

import { UWPBaseCompnent } from "../base";
// import tile from "./hocs/tile";

export class TileCon extends UWPBaseCompnent<any, any> {
    public render() {
        let { theme } = this.context;
        let { children, className, position, width, height, gutter, x = 1, y = 1 } = this.props;

        let style = {
            left: position.column * (width) + (position.column) * gutter * 2 + gutter,
            top: position.row * (height) + (position.row) * gutter * 2 + gutter,
            width: x * (width) + (x - 1) * gutter * 2,
            height: y * (height) + (y - 1) * gutter * 2
        };

        return <div className={"absolute " + className} style={style}>
            {children}
        </div>;
    }
}

// export default tile(Tile);
