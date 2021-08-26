import axios from "axios";
import { FETCH_APPOINTMENT } from "../type";

const fetchAppointmentAction = () => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/appointment',
            method: 'GET',
            headers: {access_token: localStorage.getItem("access_token")}
        })
        .then(({data}) => {
            console.log(data.data,'====action');
            dispatch({
                type: FETCH_APPOINTMENT,
                payload: data.data,
            })
        })
        .catch(err => {
            console.log(err);
        })
};

export default fetchAppointmentAction