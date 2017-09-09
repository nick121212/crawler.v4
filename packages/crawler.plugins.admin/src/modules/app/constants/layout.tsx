import { syncHistoryWithStore } from "react-router-redux";

import { ILayoutState } from "../reducers/layout";

export interface IProps {
    layout: ILayoutState;

    changeTheme?: (checked: boolean) => void;
}

export const initialState: IProps = {
    layout: {
        collapsed: false,
        theme: "light",
    }
};
