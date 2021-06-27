import { combineReducers } from "redux";

import fetchDummyReducer from "./fetchDummyReducer";
import fetchAppointmentReducer from "./fetchAppointmentReducer"

export default combineReducers({
  fetchDummyReducer, fetchAppointmentReducer
});
