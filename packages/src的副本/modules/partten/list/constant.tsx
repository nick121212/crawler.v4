import Immutable from "immutable";

import { LayoutProps } from "../layout/constant";
import { IModelProxyState } from "../../../common/reducer/proxy";

export interface ContentProps extends LayoutProps {
    fetchModel?: IModelProxyState<Immutable.Map<string, any>>;
    filter?: Immutable.Map<string, any>;
    execute?: () => void;
    setFilterGroup?: (group: string) => void;
}

export const initialState = Immutable.fromJS({
    filterGroup: ""
});
