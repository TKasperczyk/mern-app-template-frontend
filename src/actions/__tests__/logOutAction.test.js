import history from '../../history';
import {logOut} from '../logOutAction';
import {
    AUTH_ERROR,
    AUTH_DISMISSED,
} from '../types';

describe('logOut action', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
        jest.mock('../../history');
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('should dispatch auth dismissed', async () => {
        const toDispatch = logOut();
        const dispatchSpy = jest.fn();
        await toDispatch(dispatchSpy);
        expect(dispatchSpy).toHaveBeenCalledWith({type: AUTH_DISMISSED});
    });
    it('should clear localStorage', async () => {
        localStorage.setItem('mockStorageItem', true);
        expect(localStorage.getItem('mockStorageItem')).toBeTruthy();
        const toDispatch = logOut();
        await toDispatch(jest.fn());
        expect(localStorage.getItem('mockStorageItem')).toBeFalsy();
    });
    it('should handle errors', async () => {
        history.push = jest.fn(() => {
            throw new Error('Error mock');
        });
        const toDispatch = logOut();
        const dispatchSpy = jest.fn();
        await toDispatch(dispatchSpy);
        expect(dispatchSpy).toHaveBeenCalledWith({type: AUTH_ERROR, payload: 'Error during logging out'});
    });
});