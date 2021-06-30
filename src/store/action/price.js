import axios from 'axios'
import { SET_PRICELIST } from "../type";
import { setError } from "./payment";


export const setPriceList = (payload) => ({ type: SET_PRICELIST, payload })

export const fetchPriceList = (payload) => async (dispatch) => {
  try {
    const priceList = await axios({
      url: 'http://localhost:3001/price',
      method: 'GET',
      headers: {
        access_token: localStorage.access_token
      }
    })
    dispatch(setPriceList(priceList.data))
  } catch (error) {
    dispatch(setError(error))
  }
}