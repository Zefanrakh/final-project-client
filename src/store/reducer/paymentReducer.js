import { SET_ERROR, SET_LOADING } from "../type"


const initialState = {
  error: null,
  loading: false,
}

export default function paymentReducer(state = initialState, action) {
  const { type, payload } = action

  if (type === SET_LOADING) return { ...state, loading: payload }
  if (type === SET_ERROR) return { ...state, error: payload }
  return state
}