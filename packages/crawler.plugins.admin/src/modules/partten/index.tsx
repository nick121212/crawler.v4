import { default as reducer, fetchModel } from "./reducers";

export { LayoutComponentWithHoc } from "./components/layout";
export { default as reducer, fetchModel } from "./reducers";

export const sagas = [fetchModel.saga.bind(fetchModel)];

