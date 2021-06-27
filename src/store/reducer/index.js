import { combineReducers } from "redux";

import fetchDummyReducer from "./fetchDummyReducer";
import fetchAppointmentReducer from "./fetchAppointmentReducer"
import fetchCustomerReducer from "./fetchCustomerReducer"

export default combineReducers({
  fetchDummyReducer, fetchAppointmentReducer, fetchCustomerReducer
});
