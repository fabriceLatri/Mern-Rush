import axios from 'axios';
import { setAlert } from './alert';

import { 
    GET_USERS,
    CLEAR_USER,
    GET_USER,
    UPDATE_USER,
    USER_ERROR,
    PROFILE_ERROR
} from './types';

//Get All Users
export const getUsers = () => async dispatch => {
    dispatch({ type:CLEAR_USER });

    try {
        const res = await axios.get('/api/users');

        dispatch({
            type: GET_USERS,
            payload: res.data
        });
        console.log(res.data);
    } catch (err) {
        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Get User by ID
export const getUserById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/users/${userId}`);

        dispatch({
            type: GET_USER,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
};

//Update User by ID
export const updateUserById = (
    formData,
    userId,
    history
) => async dispatch => {
    try {

        const res = await axios.put(`/api/users/${userId}`, formData);

        dispatch({
            type: UPDATE_USER,
            payload: res.data
        });

        dispatch(setAlert('User Updated', 'success'));

        history.push('/users');

    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: USER_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status}
        });
    }
};