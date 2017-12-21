import { MessageReducer } from "../../common/reducer/message";

export const messageModel = new MessageReducer();

const reducer = messageModel.reducer;

export default reducer;
