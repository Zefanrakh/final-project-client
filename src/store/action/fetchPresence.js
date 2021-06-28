import axios from "axios";
import { FETCH_PRESENCE } from "../type";

const fetchPresenceAction = () => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/presence',
            method: 'GET',
            headers: {}
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