import { FETCH_SEARCH_RESULT } from "../type";

const initialState = {
  result: [],
};

const searchResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_RESULT:
      return { ...state, result: action.payload };
    default:
      return state;
  }
};
export default searchResultReducer;
