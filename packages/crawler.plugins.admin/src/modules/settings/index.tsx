import { default as reducer, fetchModel, deleteModel } from "./reducers";

export { LayoutComponentWithHoc } from "./components/layout";
export { default as reducer, fetchModel } from "./reducers";

export const sagas = [fetchModel.saga.bind(fetchModel), deleteModel.saga.bind(deleteModel)];

