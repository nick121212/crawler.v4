import { combineReducers } from "redux-immutable";

import * as main from "./main";
import * as create from "./create";
// import { default as reducers, fetchModel, deleteModel } from "./create";

export default combineReducers({
    main: main.default,
    create: create.default
});

export { fetchModel, deleteModel } from "./main";
export { submitModel } from "./create";

// export {
//     fetchModel,
//     deleteModel
// };
