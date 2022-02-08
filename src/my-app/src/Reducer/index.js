import { combineReducers } from "redux";
import authReducer from "./authReducer";
import RoomReducer from "./RoomReducer";
import typelocationReducer from "./typelocation";

const rootReducer = combineReducers({
  auth: authReducer,
  Room: RoomReducer,
  type:typelocationReducer,
});

export default rootReducer;
