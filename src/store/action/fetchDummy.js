import { FETCH_DUMMY } from "../type";

const fetchDummyAction = () => async (dispatch) => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users/1/todos"
  );
  const data = await response.json();
  dispatch({
    type: FETCH_DUMMY,
    payload: { dummy: data },
  });
};

export default fetchDummyAction;
