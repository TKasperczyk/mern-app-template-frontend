import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Root from '../../Root';
import {Home} from '../Home';

enzyme.configure({adapter: new Adapter()});
let wrapped;
const socketSpyEmitCallbackSpy = jest.fn();
const socketSpy = {
    emit: jest.fn(),
    on: jest.fn()
};
const createSocketActionSpy = jest.fn();
const logOutActionSpy = jest.fn();
const tokenMock = 'tokenMock';

const remount = ({
    initialState = {auth: {authenticated: true}}, 
    createSocket = createSocketActionSpy, 
    token = tokenMock, 
    logOut = logOutActionSpy
} = {}) => {
    //We need to set createSocket and token here because they're used by Home's lifecycle methods (componentDidMount)
    const hoc = enzyme.shallow(
        <Root initialState={initialState}>
            <Home createSocket={createSocket} token={token}></Home>
        </Root>
    );
    //Access the underlying component
    wrapped = hoc.find(Home).shallow();
    //Overwrite Redux-connected actions
    wrapped.setProps({logOut, socket: socketSpy});
};

describe('<App />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        remount();
    });
    afterEach(() => {
        wrapped.unmount();
    });
    it('displays two buttons and the auth status', () => {
        expect(wrapped.html().includes('uthenticated')).toBe(true);
        expect(wrapped.find('button').length).toBe(2);
        expect(wrapped.find('button[name="logout"]').length).toBe(1);
    });
    it('creates a new socket when the auth token is present', () => {
        expect(createSocketActionSpy).toHaveBeenCalledTimes(1);
        expect(createSocketActionSpy).toHaveBeenCalledWith({namespace: expect.anything(), token: tokenMock});
    });
    it('attaches event handlers to the socket', () => {
        expect(socketSpy.on).toHaveBeenCalledTimes(1);
    });
    it('does not create a new socket when the auth token is not present', () => {
        //Clear beforeEach remount spies
        jest.clearAllMocks();
        remount({token: null});
        expect(createSocketActionSpy).toHaveBeenCalledTimes(0);
    });
    it('calls the logOut action on button click', () => {
        expect(logOutActionSpy).toHaveBeenCalledTimes(0);
        wrapped.find('button[name="logout"]').simulate('click');
        expect(logOutActionSpy).toHaveBeenCalledTimes(1);
    });
    it('calls the ping action on button click', () => {
        expect(logOutActionSpy).toHaveBeenCalledTimes(0);
        wrapped.find('button[name="logout"]').simulate('click');
        expect(logOutActionSpy).toHaveBeenCalledTimes(1);
    });
    it('emits socket events on button click', () => {
        expect(socketSpy.emit).toHaveBeenCalledTimes(0);
        wrapped.find('button[name="ping"]').simulate('click');
        expect(socketSpy.emit).toHaveBeenCalledTimes(1);
    });
});