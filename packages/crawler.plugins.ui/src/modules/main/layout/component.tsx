import React from "react";
import { Theme as UWPThemeProvider, getTheme } from "react-uwp/Theme";

import { BaseComponent } from "../../../common/component/base";
import { LayoutProps } from "./constant";
import { hoc } from "./container";


export class Component extends BaseComponent<LayoutProps, any> {
    public render() {
        const { children } = this.props;

        return (
            <div>
                {children}
            </div>
        );
    }
}

export const ComponentWithHoc: React.ComponentClass<LayoutProps> = (Component);
