import { combineReducers } from "redux";
import fetchDummyReducer from "./fetchDummyReducer";
import customerReducer from "./customerReducer"

export default combineReducers({
  fetchDummyReducer,
  customerReducer
});
