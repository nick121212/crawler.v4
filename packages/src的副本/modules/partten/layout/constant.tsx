import { RouteComponentProps } from "react-router-dom";
import Immutable from "immutable";

import { IModelProxyState } from "../../../common/reducer/proxy";

export interface LayoutProps extends RouteComponentProps<any> {
    /**
     * 操作按钮元素
     */
    layoutExtraProps?: any;
    /**
     * 设置操作按钮元素
     */
    setOperations?: (element: JSX.Element) => void;
}

export const initialState = Immutable.fromJS({
    operations: null
});
