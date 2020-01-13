import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import ioReducer from './ioReducer';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    io: ioReducer
});