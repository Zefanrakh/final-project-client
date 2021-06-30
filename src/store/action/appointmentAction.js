import axios from "axios";
import { FETCH_APPOINTMENT } from "../type";

export const addAppointment = (payload) => (dispatch) => {

        return axios({
            url: 'http://34.200.246.160:3001/appointment',
            method: 'POST',
            headers: {access_token: localStorage.getItem("access_token")},
            data: payload
        })
};


export const fetchAppointment = () => (dispatch) => {
        axios({
            url: 'http://34.200.246.160:3001/appointment',
            method: 'GET',
            headers: {access_token: localStorage.getItem("access_token")}
        })
        .then(({data}) => {
            dispatch({
                type: FETCH_APPOINTMENT,
                payload: data.data,
            })
        })
        .catch(err => {
            console.log(err.response.data.message);
        })
};

export const fetchAppointmentByCustomer = (id) => (dispatch) => {
    console.log('masuk action');
    axios({
        url: 'http://34.200.246.160:3001/appointment/customer/'+id,
        method: 'GET',
        headers: {access_token: localStorage.getItem("access_token")}
    })
    .then(({data}) => {
        console.log(data,'datanya');
        dispatch({
            type: FETCH_APPOINTMENT,
            payload: data,
        })
    })
    .catch(err => {
        console.log(err.response.data.message);
    })
};