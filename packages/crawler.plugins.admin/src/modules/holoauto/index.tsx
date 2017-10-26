import {
    default as reducer, fetchModel,
    submitModel, roomFetchModel, roomSubmitModel,
    panelFetchModel, panelSubmitModel, buildDeleteModel,
    peojectorSubmitModel, fetchModel1, fetchModel2, fetchModel3, fetchModel4, fetchModel5
} from "./reducers";

export { LayoutComponentWithHoc } from "./components/layout";
export { default as reducer, fetchModel, submitModel } from "./reducers";
import "./styles/layout.scss";

export const sagas = [
    fetchModel.saga.bind(fetchModel),
    submitModel.saga.bind(submitModel),
    roomFetchModel.saga.bind(roomFetchModel),
    roomSubmitModel.saga.bind(roomSubmitModel),
    peojectorSubmitModel.saga.bind(peojectorSubmitModel),
    fetchModel1.saga.bind(fetchModel1),
    fetchModel2.saga.bind(fetchModel2),
    fetchModel3.saga.bind(fetchModel3),
    fetchModel4.saga.bind(fetchModel4),
    fetchModel5.saga.bind(fetchModel5),
    panelFetchModel.saga.bind(panelFetchModel),
    panelSubmitModel.saga.bind(panelSubmitModel),
    buildDeleteModel.saga.bind(buildDeleteModel),
];
