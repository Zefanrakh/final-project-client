import { combineReducers } from "redux";
import dummyReducer from "./dummyReducer";
import searchResultReducer from "./searchResultReducer";
import userReducer from "./userReducer";

export default combineReducers({
  userReducer,
  dummyReducer,
  searchResultReducer,
});
