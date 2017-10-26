import { RouteComponentProps } from "react-router-dom";

import { IModelProxyState } from "../../../common/reducers/modelproxy";

export interface MainComponentProps extends RouteComponentProps<any> {
    fetch: IModelProxyState<any>;

    execute?: () => {};
}
