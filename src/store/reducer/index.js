import { combineReducers } from "redux";
import dummyReducer from "./dummyReducer";

import userReducer from "./userReducer";

export default combineReducers({
  userReducer,
  dummyReducer,
});
