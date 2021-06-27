import axios from "axios";
import { FETCH_CUSTOMER } from "../type";

const fetchCustomerAction = () => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/customers',
            method: 'GET',
            headers: {}
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

export default fetchCustomerAction