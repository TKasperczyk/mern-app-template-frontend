import axios from 'axios';
import history from '../history';
import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_ERROR,
} from './types';

/** 
    Calls our API and logs in the user with provided credentials.
    Saves a JWT token in localStorage AND in Redux store. Sets the authenticated field in Redux store to true
    Redirects the user to the home page
**/

export const logIn = ({login, password}) => async (dispatch) => {
    try{
        const response = await axios.post('/api/login', {login, password});
        if (response.data.status){
            dispatch({type: AUTH_SUCCESS, payload: response.data.data});
            //We need to store the token in local storage in case of a page refresh
            localStorage.setItem('token', response.data.data);
            history.push('/');
        } else {
            dispatch({type: AUTH_FAILED});
        }
    } catch (error){
        dispatch({type: AUTH_ERROR, payload: 'Error during authentication'});
    }
};