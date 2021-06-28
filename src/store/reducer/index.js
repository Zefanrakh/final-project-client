import { combineReducers } from "redux";
import dummyReducer from "./dummyReducer";
import userReducer from "./userReducer";
import fetchDummyReducer from "./fetchDummyReducer";
import fetchAppointmentReducer from "./fetchAppointmentReducer"
import fetchCustomerReducer from "./fetchCustomerReducer"
import fetchPresenceReducer from "./fetchPresenceReducer"

export default combineReducers({
  fetchDummyReducer, fetchAppointmentReducer, fetchCustomerReducer, fetchPresenceReducer, serReducer
});
