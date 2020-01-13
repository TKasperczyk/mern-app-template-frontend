import { 
    AUTH_FAILED,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_DISMISSED
} from "../actions/types";

const INITIAL_STATE = {
    authenticated: localStorage.getItem('token') ? true : false,
    token: localStorage.getItem('token')
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case AUTH_FAILED: {
            return {...state, authenticated: false};
        }
        case AUTH_ERROR: {
            return {...state, authenticated: false, error: action.payload};
        }
        case AUTH_SUCCESS: {
            return {...state, authenticated: true, token: action.payload};
        }
        case AUTH_DISMISSED: {
            return {...state, authenticated: false, token: undefined};
        }
        default: {
            return state;
        }
    };
};