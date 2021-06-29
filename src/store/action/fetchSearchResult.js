import axios from "axios";
import { FETCH_SEARCH_RESULT } from "../type";

const fetchSearchResult = (searchType, keyword, isEmpty) => async (
  dispatch
) => {
  const response = await axios(
    `http://localhost:3001/search?searchType=${searchType}&keyword=${keyword}`,
    {
      method: "GET",
      headers: {
        access_token: localStorage.access_token,
      },
    }
  );
  let result;
  isEmpty ? (result = []) : (result = response.data.result);
  dispatch({
    type: FETCH_SEARCH_RESULT,
    payload: result,
  });
};

export default fetchSearchResult;
