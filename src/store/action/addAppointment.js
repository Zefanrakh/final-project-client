import axios from "axios";

const addAppointmentAction = (payload) => (dispatch) => {

        return axios({
            url: 'http://localhost:3001/appointment',
            method: 'POST',
            headers: {},
            data: payload
        })
};

export default addAppointmentAction