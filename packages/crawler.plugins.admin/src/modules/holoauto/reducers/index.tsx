import { combineReducers } from "redux-immutable";

import { fetchModel, deleteModel as buildDeleteModel } from "./building";
import { fetchModel as panelFetchModel } from "./panel";
import { default as beR, submitModel } from "./building.edit";
import { default as rR, submitModel as roomSubmitModel } from "./room.edit";
import { default as pR, submitModel as peojectorSubmitModel } from "./projector.edit";
import { default as ppR, submitModel as panelSubmitModel } from "./panel.edit";

import { layoutModel } from "./layout";

import room, { fetchModel as roomFetchModel } from "./rooms";
import projector, { fetchModel1, fetchModel2, fetchModel3, fetchModel4, fetchModel5 } from "./projector";

export default combineReducers({
    buildingEdit: beR,
    roomEdit: rR,
    panelEdit: ppR,
    projectorEdit: pR,
    building: fetchModel.reducer,
    buildDelete: buildDeleteModel.reducer,
    layout: layoutModel.reducer,
    room: roomFetchModel.reducer,
    projector1: fetchModel1.reducer,
    projector2: fetchModel2.reducer,
    projector3: fetchModel3.reducer,
    projector4: fetchModel4.reducer,
    projector5: fetchModel5.reducer,
    panel: panelFetchModel.reducer
});

export {
    roomSubmitModel,
    fetchModel,
    layoutModel,
    submitModel,
    buildDeleteModel,
    peojectorSubmitModel,
    fetchModel1,
    fetchModel2,
    fetchModel3,
    fetchModel4,
    fetchModel5,
    roomFetchModel,
    panelFetchModel,
    panelSubmitModel
};
