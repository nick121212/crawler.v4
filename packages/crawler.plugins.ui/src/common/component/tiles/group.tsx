import React from "react";
import { defaultProps, compose, withState } from "recompose";

import { UWPBaseCompnent } from "../base";
import column, { TileGroupColumnOutProps } from "./hocs/column";
import row, { TileGroupRowOutProps } from "./hocs/row";
import modec, { TileGroupModeOutProps } from "./hocs/mode";
import calc, { TileGroupCalcOutProps } from "./hocs/calc";
import { TileCon } from "./tile.con";


export interface TileGroupProps extends React.HTMLAttributes<HTMLDivElement>,
    TileGroupColumnOutProps, TileGroupRowOutProps, TileGroupModeOutProps, TileGroupCalcOutProps {
    tiles?: Array<JSX.Element>;

    className?: string;
    classConName?: string;
}

const hoc = compose<TileGroupProps, TileGroupProps>(
    defaultProps<TileGroupProps>({
        tileGutter: 1,
        tileWidth: 100,
        tileHeight: 100,
        maxGrid: 3,
        direction: "row",
    }),
    column,
    row,
    calc,
    modec,
);

class Component extends UWPBaseCompnent<TileGroupProps, any> {
    public render() {
        const { updateEle, container, className, classConName, title,
            tileWidth, tileHeight, tileGutter, eleRes, style } = this.props;
        let calcResult: any;

        if (container && eleRes) {
            calcResult = {
                height: eleRes.rows * (tileHeight as number) + eleRes.rows * tileGutter * 2,
                width: eleRes.columns * (tileWidth as number) + eleRes.columns * tileGutter * 2,
                elements: eleRes.elements.map((e: any, index: number) => {
                    return <TileCon
                        position={e.position}
                        width={tileWidth}
                        height={tileHeight}
                        gutter={tileGutter}
                        x={e.x}
                        y={e.y}
                        key={index.toString()}>{e.children}</TileCon>;
                })
            };
        }

        return (
            <div className={className + " tile-group overflow-auto"}
                style={style}
                ref={(e: HTMLDivElement) => { updateEle(e); }}>
                {title}
                <div style={{
                    height: calcResult ? calcResult.height : 0,
                    width: calcResult ? calcResult.width : 0
                }} className={"relative " + classConName || ""}>
                    {calcResult ? calcResult.elements : null}
                </div>
            </div >
        );
    }
}

export default hoc(Component);
