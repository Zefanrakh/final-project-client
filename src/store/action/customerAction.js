import { FETCH_CUSTOMER } from "../type";

export function fetchCustomerAction(){
    return (dispatch)=>{
        fetch('http://localhost:3000/customers')
        .then(response=>response.json())
        .then(data=>{
          dispatch({type:FETCH_CUSTOMER, payload:data})
          console.log(data,"<<<<<<<<<<<<<<<")
        })
        .catch(err=>{
          console.log(err)
        })
    }
}

export function addCustomerAction(payload){
    return (dispatch)=>{
        return fetch('http://localhost:3000/customers', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
    }
}