import axios from "axios";
import { FETCH_PRESENCE } from "../type";

const fetchPresenceAction = () => (dispatch) => {

        return axios({
            url: 'http://34.200.246.160:3001/presence',
            method: 'GET',
            headers: {access_token: localStorage.getItem("access_token")}
        })
        .then(({data}) => {
            dispatch({
                type: FETCH_PRESENCE,
                payload: data,
            })
        })
        .catch(err => {
            console.log(err);
        })
};

export default fetchPresenceAction