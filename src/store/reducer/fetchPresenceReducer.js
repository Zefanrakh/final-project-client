import { FETCH_PRESENCE } from "../type";

const initialState = {
  presenceList: [],
};

const fetchPresenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRESENCE:
      return { ...state, presenceList: action.payload };
    default:
      return state;
  }
};

export default fetchPresenceReducer;
