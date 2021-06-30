import { combineReducers } from "redux";
import dummyReducer from "./dummyReducer";
import userReducer from "./userReducer";
import fetchAppointmentReducer from "./fetchAppointmentReducer";
import fetchCustomerReducer from "./fetchCustomerReducer";
import fetchPresenceReducer from "./fetchPresenceReducer";
import searchResultReducer from "./searchResultReducer";

export default combineReducers({
  dummyReducer,
  fetchAppointmentReducer,
  fetchCustomerReducer,
  fetchPresenceReducer,
  userReducer,
  searchResultReducer,
});
