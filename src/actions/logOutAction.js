/**
 * Calls our API and logs out the user with provided credentials.
 * Clears the localStorage (WHOLE). Sets the authenticated field in Redux store to false
 * Redirects the user to the sign page
 */

import history from '../history';
import {
    AUTH_ERROR,
    AUTH_DISMISSED,
} from './types';

export const logOut = () => async (dispatch) => {
    try{
        dispatch({type: AUTH_DISMISSED});
        localStorage.clear();
        history.push('/signin');
    } catch (error){
        dispatch({type: AUTH_ERROR, payload: 'Error during logging out'});
    }
};