import React from "react";
import { defaultProps, shouldUpdate } from "recompose";
import classnames from "classnames";

import cls from "../styles/layout.scss";

export interface WallInfoProps {
    split?: string;
    keys?: string;
    className?: string;
    disabled?: boolean;
    onChange?: (keys: string) => void;
}

@(defaultProps<WallInfoProps>({
    split: ","
}) as any)
@(shouldUpdate((cur: WallInfoProps, next: WallInfoProps) => {
    let curKeys = cur.keys ? cur.keys.split(cur.split).sort() : [];
    let nextKeys = next.keys ? next.keys.split(next.split).sort() : [];

    return curKeys.join() !== nextKeys.join();
}) as any)
export class WallInfo extends React.Component<WallInfoProps, any> {
    public render() {
        let { className, children } = this.props;
        let keys = this.getKeys();

        return (
            <div className={className}>
                <div className={cls["room-show"]}>
                    <div className={classnames(cls["is-front"], cls["wall-info"])} ></div>
                    <div className={classnames(cls["is-right"], cls["wall-info"], {
                        [cls["is-selected"]]: keys.indexOf("2") > -1
                    })} onClick={this.onSelect.bind(this, 2)}>2 right</div>
                    <div className={classnames(cls["is-back"], cls["wall-info"], {
                        [cls["is-selected"]]: keys.indexOf("5") > -1
                    })} onClick={this.onSelect.bind(this, 5)}>5 floor</div>
                    <div className={classnames(cls["is-left"], cls["wall-info"], {
                        [cls["is-selected"]]: keys.indexOf("4") > -1
                    })} onClick={this.onSelect.bind(this, 4)}>4 left</div>
                    <div className={classnames(cls["is-floor"], cls["wall-info"], {
                        [cls["is-selected"]]: keys.indexOf("1") > -1
                    })} onClick={this.onSelect.bind(this, 1)}>1  front</div>
                </div>
                {children}
            </div>
        );
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
