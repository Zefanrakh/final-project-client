import { instanceAxios } from "../../helpers/api";
import { SET_PRICELIST } from "../type";
import { setError } from "./payment";


export const setPriceList = (payload) => ({ type: SET_PRICELIST, payload })

export const fetchPriceList = (payload) => async (dispatch) => {
  try {
    const priceList = await instanceAxios({
      url: '/price',
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      }
    })
    dispatch(setPriceList(priceList))
  } catch (error) {
    dispatch(setError(error))
  }
}