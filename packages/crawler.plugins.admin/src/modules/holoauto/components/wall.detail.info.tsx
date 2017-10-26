import React from "react";
import { defaultProps, shouldUpdate } from "recompose";
import classnames from "classnames";

import cls from "../styles/layout.scss";
import * as classNames from "classnames";

import { hoc } from "../containers/wall.detail.info";

export interface WallDetailInfoProps {
    keys?: string;
    split?: string;
    disabled?: boolean;
    onChange?: (keys: string) => void;
    length?: number;
    width?: number;
    height?: number;
}

@(defaultProps<WallDetailInfoProps>({
    split: ","
}) as any)
@(shouldUpdate((cur: WallDetailInfoProps, next: WallDetailInfoProps) => {
    let curKeys = cur.keys ? cur.keys.split(cur.split).sort() : [];
    let nextKeys = next.keys ? next.keys.split(next.split).sort() : [];

    return curKeys.join() === nextKeys.join();
}) as any)
export class WallDetailInfo extends React.Component<WallDetailInfoProps, any> {
    public render() {
        let titles = ["1 Front", "2 Right", "3 Back", "4 Left", "5 Floor"];
        let widths = ["LH", "HW", "LH", "WH", "WL"];
        let keys = this.getKeys();

        console.log(this.props);

        return (
            <ul className="list pl0 mt0 measure center">
                {
                    titles.map((title: string, index: number) => {
                        return (
                            <li className={classnames("flex items-center lh-copy pa3 ph0-l bb b--black-10", {
                                "bg-light-gray": keys.indexOf("" + (index + 1)) > -1
                            })}
                                key={index.toString()}
                                onClick={() => {
                                    this.onSelect(index + 1);
                                }}>
                                <div className={classnames("pl3 flex-auto", {
                                    "blue": keys.indexOf("" + (index + 1)) > -1
                                })} >
                                    {title}
                                </div>
                                <div>
                                    <span className={classnames("f6 pr3", {
                                        "blue": keys.indexOf("" + (index + 1)) > -1
                                    })}>{this.getSize(widths[index])}</span>
                                </div>
                            </li>
                        );
                    })
                }

            </ul>
        );
    }

    private getSize(size: string): string {
        let sizes = size.split("");
        let { height, length, width } = this.props;

        sizes = sizes.map((s: string) => {
            let rtn = 0;

            switch (s) {
                case "L":
                    rtn = length;
                    break;
                case "H":
                    rtn = height;
                    break;
                case "W":
                    rtn = width;
                    break;
            }

            return rtn.toString();
        });

        return sizes.join("*");
    }

    private getKeys(): Array<string> {
        let { keys } = this.state || { keys: undefined };
        let { split } = this.props;

        if (keys === undefined) {
            keys = this.props.keys || "";
        }

        keys = keys ? keys.split(split) : [];

        return keys;
    }

    private onSelect(index: number) {
        let keys = this.getKeys();
        let curIndex = keys.indexOf(index.toString());
        let { split } = this.props;

        if (this.props.disabled) {
            return;
        }

        if (curIndex === -1) {
            keys.push(index.toString());
        } else {
            keys.splice(curIndex, 1);
        }

        if (this.props.onChange) {
            this.props.onChange(keys.join(split));
        }

        // this.setState({
        //     keys: keys.join(split)
        // });
    }
}

export const WallDetailInfoComponentWithHoc = (WallDetailInfo);
