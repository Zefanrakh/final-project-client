import axios from "axios";

const addPresenceAction = (payload) => (dispatch) => {

        return axios({
            url: 'http://34.200.246.160:3001/presence',
            method: 'POST',
            headers: {access_token: localStorage.getItem("access_token")},
            data: payload
        })
};

export default addPresenceAction