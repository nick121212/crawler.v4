import { combineReducers } from "redux-immutable";

import { fetchModel } from "./main";

export default combineReducers({
    main: fetchModel.reducer
});


export {
    fetchModel
};
