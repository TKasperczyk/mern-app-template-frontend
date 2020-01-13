import { 
    SOCKET_CREATED
} from "../actions/types";

const INITIAL_STATE = {
    socket: localStorage.getItem('socket')
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case SOCKET_CREATED: {
            return {...state, socket: action.payload};
        }
        default: {
            return state;
        }
    };
};