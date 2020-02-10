import ioReducer from '../ioReducer';
import {
    SOCKET_CREATED,
} from '../../actions/types';

describe('ioReducer', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it('initializes a default state based on local storage', () => {
        //For testing the initial state, we need to re-require this module two times
        let ioReducer = require('../ioReducer').default; //Overwrite the default module
        const actionMock = {
            type: 'mock'
        };
        //Socket uninitializied
        let newState = ioReducer(undefined, actionMock);
        expect(newState.socket).toBe(null);
        //Socket initialized
        const socketMock = 'socketMock';
        localStorage.setItem('socket', socketMock);
        jest.resetModules(); //To make sure that the module cache is clear
        ioReducer = require('../ioReducer').default;
        newState = ioReducer(undefined, actionMock);
        expect(newState.socket).toBe(socketMock);
    });
    it('handles SOCKET_CREATED', () => {
        const socketMock = 'socketMock';
        const actionMock = {
            type: SOCKET_CREATED,
            payload: socketMock
        };
        const newState = ioReducer({}, actionMock);
        expect(newState.socket).toBe(socketMock);
    });
    it('handles unknown action types', () => {
        const currentStateMock = {propMock: 'propMock'};
        const actionMock = {
            type: 'UNKNOWNTYPE',
        };
        const newState = ioReducer(currentStateMock, actionMock);
        expect(newState).toEqual(currentStateMock);
    });
});