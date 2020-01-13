import io from 'socket.io-client';
import {
    SOCKET_CREATED,
} from './types';

/** 
    Creates a new websocket and connects it to the given namespace with the given JWT token.
    Attaches event handlers for error handling.
    Saves the socket in localStorage and Redux store
**/

export const createSocket = ({namespace, token}) => async (dispatch) => {
    const socket = io.connect(`localhost:3001/${namespace}`, {
        transports: ['websocket'],
        query: {
            token
        }
    });
    socket.on('connect_error', error => console.error(error));
    socket.on('connect_timeout', timeout => console.error(timeout));
    socket.on('error', error => console.error(error));
    socket.on('reconnect_error', error => console.error(error));
    localStorage.setItem(`socket${namespace}`, socket);
    dispatch({type: SOCKET_CREATED, payload: socket});
};