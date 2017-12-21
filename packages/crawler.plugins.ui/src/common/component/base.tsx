import React from "react";
import PropTypes from "react-proptypes";
import { is } from "immutable";
import { ValidationMap } from "react";
import { ThemeType } from "react-uwp";

export class UWPBaseCompnent<P, S> extends React.PureComponent<P, S> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ThemeType };
}

/**
 * component的基类
 * 更改了shouldComponentUpdate方法
 * 减少rereder的次数，提高效率
 */
export class BaseComponent<P, S> extends React.Component<P, S> {
    public static contextTypes = { theme: PropTypes.object };
    public context: { theme: ThemeType };

    public shouldComponentUpdate(nextProps: P, nextState: S) {
        const thisProps: any = this.props || {};
        const thisState: any = this.state || {};

        nextState = nextState || {} as any;
        nextProps = nextProps || {} as any;

        if (Object.keys(thisProps).length !== Object.keys(nextProps).length ||
            Object.keys(thisState).length !== Object.keys(nextState).length) {
            return true;
        }

        for (const key in nextProps) {
            if (!is(thisProps[key], nextProps[key])) {
                return true;
            }
        }

        for (const key in nextState) {
            if (!is(thisState[key], nextState[key])) {
                return true;
            }
        }

        return false;
    }
}
