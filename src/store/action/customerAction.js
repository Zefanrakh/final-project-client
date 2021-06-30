import { FETCH_CUSTOMER } from "../type";
import axios from "axios";

export const addCustomer = (payload) => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/customers',
            method: 'POST',
            headers: {access_token: localStorage.getItem("access_token")},
            data: payload
        })
};

export const fetchCustomer = () => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/customers',
            method: 'GET',
            headers: {access_token: localStorage.getItem("access_token")}
        })
        .then(({data}) => {
            dispatch({
                type: FETCH_CUSTOMER,
                payload: data.customers,
            })
        })
        .catch(err => {
            console.log(err);
        })
};

export function deleteCustomer(payload){
    const id = payload
    return(dispatch)=>{
        fetch(`http://localhost:3001/customers/${id}`,{
            method:'Delete',
            headers:{access_token: localStorage.getItem("access_token"),
                'Content-Type' : 'application/json',
            }
        })
        .then(response=>{
            response.json()
        })
        .then(task=>{
            dispatch(fetchCustomer())
        })
    }
}