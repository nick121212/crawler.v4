import { RouteComponentProps } from "react-router-dom";

import { IModelProxyState } from "../../../common/reducers/modelproxy";
import { defaultKeys } from "./index";

export interface MainComponentProps extends RouteComponentProps<any> {
    fetch: IModelProxyState<any>;
    remove: IModelProxyState<any>;

    execute?: () => {};
    removeItem?: (data: any, idx: number) => {};

    executeAction?: () => {};
    removeItemAction?: (data: any, idx: number) => {};
}

export const reducerKeys = defaultKeys.concat(["main"]);
