import { SET_ERROR, SET_INVOICE, SET_LOADING } from "../type"
import { instanceAxios } from '../../helpers/api'

export const setLoading = (payload) => ({ type: SET_LOADING, payload })
export const setError = (payload) => ({ type: SET_ERROR, payload })

export const createInvoice = (payload) => async (dispatch) => {

  try {
    const newInvoice = await instanceAxios({
      url: '/checkout/invoice',
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
    const paymentDetail = await instanceAxios({
      url: '/paymentDetails',
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