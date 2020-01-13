import axios from 'axios';
import history from '../history';
import {
    AUTH_ERROR,
    AUTH_DISMISSED,
} from './types';

/** 
    Calls our API and logs out the user with provided credentials.
    Clears the localStorage (WHOLE). Sets the authenticated field in Redux store to false
    Redirects the user to the login page
**/

export const logOut = () => async (dispatch) => {
    try{
        const response = await axios.get('/api/logout');
        if (response.data.status){
            dispatch({type: AUTH_DISMISSED});
            localStorage.clear();
            history.push('/login');
        } else {
            dispatch({type: AUTH_ERROR, payload: response.data.error});
        }
    } catch (error){
        dispatch({type: AUTH_ERROR, payload: 'Error during logging out'});
    }
};