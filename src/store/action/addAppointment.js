import instanceAxios from '../../helpers/api'

const addAppointmentAction = (payload) => async (dispatch) => {
    try {
        const appointment = await instanceAxios({
            url: '/appointment',
            method: 'POST',
            headers: {
                access_token: localStorage.access_token
            },
            data: payload
        })
        return appointment
    } catch (error) {
        console.log(error);
    }
};

export default addAppointmentAction