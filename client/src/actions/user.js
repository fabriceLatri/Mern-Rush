import axios from 'axios';
// import { setAlert } from './alert';

import { 
    GET_USERS,
    CLEAR_USER,
    GET_USER,
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