import React from "react";

export interface TileGroupColumnOutProps {
    calcColumn?: (maxGrid: number, width: number, height: number) => any;
}


export default (Component: new () => React.Component<any, any>) => {
    class Hoc extends React.PureComponent<any, any> {
        private map = {
            indexX: 0,
            blocks: []
        };

        public render() {
            return <Component calcColumn={this.calcColumn.bind(this)} {...this.props} />;
        }

        /**
         * 初始化行
         * 把当前行的数据都重置成0
         * @param index        需要初始化的列
         * @param calcMaxGrid  最大的行数
         */
        private initCurrentIndexMeta(index: number, calcMaxGrid: number) {
            let { blocks } = this.map;

            while (blocks.length < calcMaxGrid) {
                blocks.push([]);
            }

            for (let i = 0; i < blocks.length; i++) {
                if (blocks[i][index] === undefined) {
                    blocks[i][index] = 0;
                }
            }
        }

        /**
         * 获取当前格子对应的坐标位置
         * 1. 查找当前行有没有空格，没有的话，换行递归
         * 2. 判断当前行的格子数是否满足tile的x，不满足则换行递归
         * 3. 判断当前column中，是否存在y的连续格子数，不满足则换行递归
         * 4. 填充当前tile所占用的格子，返回数据
         * @param x            当前tile所占用的宽度格
         * @param y            当前tile所占用的高度格
         * @param calcMaxGrid  最大的格子数量
         * @param column       起始列
         */
        private getRangePosition(x: number, y: number, calcMaxGrid: number, column = 0): {
            column: number;
            row: number;
        } {
            let { blocks } = this.map, rowX;

            this.initCurrentIndexMeta(column, calcMaxGrid);

            // 计算当前列中的第一个空格子
            rowX = (() => {
                let n = 0;

                while (n < calcMaxGrid) {
                    if (blocks[n][column] === 0) {
                        return n;
                    }
                    n++;
                }
                return -1;
            })();

            // 如果没有找到当前列的空格子，则换一列
            if (rowX < 0) {
                return this.getRangePosition(x, y, calcMaxGrid, column + 1);
            }

            // 如果当前列中，没有连续的y格，则换一列
            if (rowX + y > calcMaxGrid) {
                return this.getRangePosition(x, y, calcMaxGrid, column + 1);
            }

            // 如果当前列中，不存在连续的y，则换一列
            for (let i = 0; i < y; i++) {
                if (blocks[i + rowX][column]) {
                    return this.getRangePosition(x, y, calcMaxGrid, column + 1);
                }
            }

            // 如果当前行中，不存在连续的x，则换列
            for (let i = 0; i < x; i++) {
                this.initCurrentIndexMeta(i + column, calcMaxGrid);
                if (blocks[rowX][i + column]) {
                    return this.getRangePosition(x, y, calcMaxGrid, column + 1);
                }
            }

            for (let i = 0; i < x; i++) {
                blocks[rowX][i + column] = 1;

                for (let j = 0; j < y; j++) {
                    blocks[j + rowX][i + column] = 1;
                }
            }

            return {
                column: column,
                row: rowX
            };
        }

        /**
         * 计算元素的位置
         * @param d            数据，包含{x:number,y:number}
         * @param tileWidth    tile的宽度
         * @param tileHeight   tile的高度
         * @param tileGutter   tile的间隔
         * @param calcMaxGrid  横向最大格子数量
         */
        private calcPosition(d: any, tileWidth: number, tileHeight: number, tileGutter: number, calcMaxGrid: number) {
            let { x = 1, y = 1 } = d;

            if (y > calcMaxGrid) {
                console.warn(`超过了{calcMaxGrid}的上限`);
                y = calcMaxGrid;
            }

            return this.getRangePosition(x, y, calcMaxGrid);
            // let style = {
            //     left: position.column * (tileWidth) + (position.column) * tileGutter * 2 + tileGutter,
            //     top: position.row * (tileHeight) + (position.row) * tileGutter * 2 + tileGutter,
            //     width: x * (tileWidth) + (x - 1) * tileGutter * 2,
            //     height: y * (tileHeight) + (y - 1) * tileGutter * 2
            // };

            // return style;
        }

        private calcTotalGrid() {
            let columns = 0, rows = 0;

            columns = this.map.blocks.length ? this.map.blocks[0].length : 0;
            rows = this.map.blocks.length;

            this.map.blocks.reverse().map((block: Array<number>, index: number) => {
                let ii = block.lastIndexOf(1);

                if (ii === -1) {
                    rows--;
                }
            });

            return { rows, columns };
        }

        /**
         * 计算位置
         */
        private calcColumn(maxGrid: number, tileWidth: number, tileHeight: number) {
            const { tileGutter, tiles } = this.props;
            let calcMaxGrid = maxGrid;
            let calcTileWidth = tileWidth;
            let calcTileHeight = tileHeight;

            this.map = {
                indexX: 0,
                blocks: []
            };

            if (!tiles) {
                return null;
            }

            let eles = tiles.map((d: JSX.Element, index: number) => {
                if (!d || !d.props) {
                    return null;
                }

                let position = this.calcPosition(d.props, calcTileWidth, calcTileHeight, tileGutter, calcMaxGrid);

                // return <div key={index.toString()} className={"absolute " + d.props.className} style={style}>
                //     {d}
                // </div>;

                return {
                    children: d,
                    x: d.props.x,
                    y: d.props.y,
                    position
                };
            });

            let { columns, rows } = this.calcTotalGrid();

            console.log("计算得出的最大列数", columns);
            console.log("计算得出的最大行数", rows);

            return {
                elements: eles,
                rows: rows,
                columns: columns,
                width: columns * (tileWidth) + (columns) * tileGutter * 2,
                height: rows * (tileHeight) + (rows) * tileGutter * 2
            };
        }
    }

    return Hoc;
};
