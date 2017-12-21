import { combineReducers } from "redux-immutable";
import {
    reducer as designReducer,
    actions as designActions
} from "./design";
import {
    ComponentWithHoc as SettingLayoutComponent,
} from "./layout";

export {
    SettingLayoutComponent
};
export const reducer = combineReducers({
    design: designReducer
});


export const actions = [
    ...designActions
];
