import { FETCH_CUSTOMER, ADD_CUSTOMER } from "../type";
const initialState = {
    fetchCustomer:[]
}

export default function reducer(state = initialState, action){
    const {type,payload} = action

    if(type === FETCH_CUSTOMER){
        return {...state, fetchCustomer:payload}
    }else{
        return state
    }
}
