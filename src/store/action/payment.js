import { SET_ERROR, SET_INVOICE, SET_LOADING } from "../type"
import axios from 'axios'

export const setLoading = (payload) => ({ type: SET_LOADING, payload })
export const setError = (payload) => ({ type: SET_ERROR, payload })

export const createInvoice = (payload) => async (dispatch) => {
  console.log(payload,'di action===>');
  try {
    const newInvoice = await axios({
      url: 'http://34.200.246.160:3001/checkout/invoice',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.access_token,
      }
    })
    return newInvoice
  } catch (error) {
    dispatch(setError(error))
  }
}

export const createPaymentDetail = (payload) => async (dispatch) => {
  try {
    const paymentDetail = await axios({
      url: 'http://34.200.246.160:3001/paymentDetails',
      method: 'POST',
      data: payload,
      headers: {
        access_token: localStorage.access_token
      },
    })
  } catch (error) {
    dispatch(setError(error))
  }
}