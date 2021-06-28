import { FETCH_APPOINTMENT } from "../type";

const initialState = {
  appointments: [],
};

const fetchAppointentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_APPOINTMENT:
      return { ...state, appointments: action.payload };
    default:
      return state;
  }
};

export default fetchAppointentReducer;
