import { combineReducers } from "redux";
import settingReducer from "./setting";
import tokenReducer from "./token";

export default combineReducers({
  settingReducer,
  tokenReducer
});
