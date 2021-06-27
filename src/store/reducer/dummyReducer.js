import { FETCH_DUMMY } from "../type";

const initialState = {
  dummy: [],
};

const dummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DUMMY:
      return { ...state, dummy: action.payload.dummy };
    default:
      return state;
  }
};

export default dummyReducer;
