import authReducer from '../authReducer';
import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_DISMISSED
} from '../../actions/types';

describe('authReducer', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    it('initializes a default state based on local storage', () => {
        //For testing the initial state, we need to re-require this module two times
        let authReducer = require('../authReducer').default; //Overwrite the default module
        const actionMock = {
            type: 'mock'
        };
        //Unauthenticated
        let newState = authReducer(undefined, actionMock);
        expect(newState.authenticated).toBe(false);
        expect(newState.token).toBe(null);
        //Authenticated
        const tokenMock = 'tokenMock';
        localStorage.setItem('token', tokenMock);
        jest.resetModules(); //To make sure that the module cache is clear
        authReducer = require('../authReducer').default;
        newState = authReducer(undefined, actionMock);
        expect(newState.authenticated).toBe(true);
        expect(newState.token).toBe(tokenMock);
    });
    it('handles AUTH_FAILED', () => {
        const actionMock = {
            type: AUTH_FAILED
        };
        const newState = authReducer({}, actionMock);
        expect(newState.authenticated).toBe(false);
    });
    it('handles AUTH_SUCCESS', () => {
        const tokenMock = 'tokenMock';
        const actionMock = {
            type: AUTH_SUCCESS,
            payload: tokenMock
        };
        const newState = authReducer({}, actionMock);
        expect(newState.authenticated).toBe(true);
        expect(newState.token).toBe(tokenMock);
    });
    it('handles AUTH_ERROR', () => {
        const errorMock = 'errorMock';
        const actionMock = {
            type: AUTH_ERROR,
            payload: errorMock
        };
        const newState = authReducer({}, actionMock);
        expect(newState.authenticated).toBe(false);
        expect(newState.error).toBe(errorMock);
    });
    it('handles AUTH_DISMISSED', () => {
        const actionMock = {
            type: AUTH_DISMISSED,
        };
        const currentStateMock = {
            token: 'tokenMock',
            authenticated: true
        };
        const newState = authReducer(currentStateMock, actionMock);
        expect(newState.authenticated).toBe(false);
        expect(newState.token).toBe(undefined);
    });
    it('handles unknown action types', () => {
        const currentStateMock = {propMock: 'propMock'};
        const actionMock = {
            type: 'UNKNOWNTYPE',
        };
        const newState = authReducer(currentStateMock, actionMock);
        expect(newState).toEqual(currentStateMock);
    });
});