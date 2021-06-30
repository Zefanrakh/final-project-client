import { SET_PRICELIST } from "../type"

const initialState = {
  priceList =[]
}

export default function priceReducer(state = initialState, action) {
  const { type, payload } = action
  if (type === SET_PRICELIST) return { ...state, priceList: payload }
  return state
}