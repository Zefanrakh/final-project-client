import { FETCH_CUSTOMER } from "../type";

const initialState = {
  customers: [],
};

const fetchCustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMER:
      return { ...state, customers: action.payload };
    default:
      return state;
  }
};

export default fetchCustomerReducer;
