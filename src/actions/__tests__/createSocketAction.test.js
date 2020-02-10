import {createSocket} from '../createSocketAction';
import {
    SOCKET_CREATED,
} from '../types';


const namespaceMock = 'namespaceMock';
const tokenMock = 'tokenMock';

describe('createSocket action', () => {
    beforeEach(() => {
        localStorage.clear();
    });
    afterAll(() => {
        jest.restoreAllMocks();
    });
    it('has a correct type', async () => {
        const toDispatch = createSocket({namespace: namespaceMock, token: tokenMock});
        const dispatchSpy = jest.fn();
        await toDispatch(dispatchSpy);
        expect(dispatchSpy).toHaveBeenCalledWith({
            type: SOCKET_CREATED,
            payload: expect.anything()
        });
    });
    it('creates a socket based on the provided namespace and token', (done) => {
        const toDispatch = createSocket({namespace: namespaceMock, token: tokenMock});
        const dispatchSpy = jest.fn(({type, payload}) => {
            expect(typeof payload).toEqual('object');
            expect(payload.nsp).toEqual(`/${namespaceMock}`);
            expect(payload.query).toEqual({token: tokenMock});
            done();
        });
        toDispatch(dispatchSpy);
    });
    it('saves the created socket to localStorage', async () => {
        const toDispatch = createSocket({namespace: namespaceMock, token: tokenMock});
        await toDispatch(jest.fn());
        expect(localStorage.getItem(`socket${namespaceMock}`)).toBeTruthy();
    });
});