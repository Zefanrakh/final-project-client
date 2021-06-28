import axios from "axios";

const addPresenceAction = (payload) => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/presence',
            method: 'POST',
            headers: {},
            data: payload
        })
};

export default addPresenceAction