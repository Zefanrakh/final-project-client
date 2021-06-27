import axios from "axios";

const addCustomerAction = (payload) => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/customers',
            method: 'POST',
            headers: {},
            data: payload
        })
};

export default addCustomerAction