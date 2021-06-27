import { SET_USER } from "../type";

const setUserAction = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

export default setUserAction;
