import fetchDummyAction from "./fetchDummy";
import addPresence from "./addPresence";
import { fetchCustomer, addCustomer, deleteCustomer } from "./customerAction";
import { fetchAppointment, addAppointment, fetchAppointmentByCustomer} from "./appointmentAction";
import fetchPresence from "./fetchPresence";
import setUserAction from "./setUser";
import fetchSearchResult from "./fetchSearchResult";

export {
  fetchDummyAction,
  addAppointment,
  fetchAppointment,
  addPresence,
  fetchCustomer,
  addCustomer,
  fetchPresence,
  deleteCustomer,
  setUserAction,
  fetchSearchResult,
  fetchAppointmentByCustomer
};
