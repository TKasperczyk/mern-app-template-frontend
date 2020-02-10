import axios from 'axios';
import {signIn} from '../signInAction';
import {
    AUTH_FAILED,
    AUTH_SUCCESS,
    AUTH_ERROR,
} from '../types';

const usernameMock = 'usernameMock';
const passwordMock = 'passwordMock';
describe('signIn action', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
        jest.mock('axios');
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('handles successfull sign ins', async () => {
        const responsePayloadMock = {
            data: {
                status: true,
                data: 'tokenMock',
                error: null
            }
        };
        axios.post = jest.fn(() => {
           return responsePayloadMock;
        });        
        const toDispatch = signIn({username: usernameMock, password: passwordMock});
        const dispatchSpy = jest.fn();
        await toDispatch(dispatchSpy);
        expect(axios.post).toHaveBeenCalledWith('/api/signin', {username: usernameMock, password: passwordMock});
        expect(dispatchSpy).toHaveBeenCalledWith({type: AUTH_SUCCESS, payload: responsePayloadMock.data.data});
        expect(localStorage.getItem('token')).toBe(responsePayloadMock.data.data);
    });
    it('handles failed sign ins', async () => {
        const responsePayloadMock = {
            data: {
                status: false,
                data: null,
                error: 'failed auth'
            }
        };
        axios.post = jest.fn(() => {
           return responsePayloadMock;
        });
        const toDispatch = signIn({username: usernameMock, password: passwordMock});
        const dispatchSpy = jest.fn();
        await toDispatch(dispatchSpy);
        expect(axios.post).toHaveBeenCalledWith('/api/signin', {username: usernameMock, password: passwordMock});
        expect(dispatchSpy).toHaveBeenCalledWith({type: AUTH_FAILED});
    });
    it('handles errors during auth', async () => {
        const malformedResponsePayloadMock = {
        };
        axios.post = jest.fn(() => {
           return malformedResponsePayloadMock;
        });
        const toDispatch = signIn({username: usernameMock, password: passwordMock});
        const dispatchSpy = jest.fn();
        await toDispatch(dispatchSpy);
        expect(axios.post).toHaveBeenCalledWith('/api/signin', {username: usernameMock, password: passwordMock});
        expect(dispatchSpy).toHaveBeenCalledWith({type: AUTH_ERROR, payload: 'Error during authentication'});
    });
});