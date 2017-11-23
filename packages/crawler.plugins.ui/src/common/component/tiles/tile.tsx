import React from "react";
import classNames from "classnames";
import Icon from "react-uwp/Icon";

import { UWPBaseCompnent } from "../base";
import tile from "./hocs/tile";

class Tile extends UWPBaseCompnent<any, any> {
    public render() {
        let { theme } = this.context;
        let { x, y, children, className = "h-100", isSelect = false, style = {} } = this.props;

        if (isSelect) {
            style.borderColor = theme.accent;
            style.borderWidth = 4;
        }

        return <div style={style} className={classNames("tile", className, [{ "ba": isSelect }])}>
            {children}
            {isSelect ? <div style={{
                position: "absolute",
                borderTop: "32px solid " + theme.accent,
                borderLeft: "32px solid transparent",
                width: 32,
                right: 4,
                top: 4,
                zIndex: 101
            }}>
                <Icon style={{
                    position: "absolute",
                    top: -30,
                    right: 1
                }}>Accept</Icon>
            </div> : null}
        </div>;
    }
}

export default tile(Tile as any);
