import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Root from '../../Root';
import {SignIn} from '../SignIn';

enzyme.configure({adapter: new Adapter()});
let wrapped;
const signInActionSpy = jest.fn();
const logOutActionSpy = jest.fn();
const signUpActionSpy = jest.fn();

describe('<SignIn />', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        const hoc = enzyme.shallow(
            <Root>
                <SignIn handleSubmit={
                    //No need to pass any values - we're not testing redux-form itself
                    fn => fn
                }></SignIn>
            </Root>
        );
        //Access the underlying component (no need to test redux-form itself, so we're skipping its logic here)
        wrapped = hoc.find(SignIn).shallow();
        //Overwrite Redux-connected actions
        wrapped.setProps({signIn: signInActionSpy, signUp: signUpActionSpy, logOut: logOutActionSpy});
    });
    afterEach(() => {
        wrapped.unmount();
    });
    it('has one form with two Fields and two buttons when not authenticated', () => {
        expect(wrapped.find('form').length).toBe(1);
        expect(wrapped.find('button').length).toBe(2);
        expect(wrapped.find('Field[name="username"]').length).toBe(1);
        expect(wrapped.find('Field[name="password"]').length).toBe(1);
    });
    it('calls the signIn action on button click', () => {
        expect(signInActionSpy).toHaveBeenCalledTimes(0);
        wrapped.find('button[name="signin"]').simulate('click');
        expect(signInActionSpy).toHaveBeenCalledTimes(1);
    });
    it('calls the signUp action on button click', () => {
        expect(signUpActionSpy).toHaveBeenCalledTimes(0);
        wrapped.find('button[name="signup"]').simulate('click');
        expect(signUpActionSpy).toHaveBeenCalledTimes(1);
    });
    it('displays the error message if there is any', () => {
        const errorMessageMock = 'errorMessageMock';
        wrapped.setProps({errorMessage: errorMessageMock});
        expect(wrapped.contains(errorMessageMock)).toBe(true);
    });
    it('displays the logout button if the user is already logged in', () => {
        wrapped.setProps({authenticated: true});
        expect(wrapped.find('Field[name="username"]').length).toBe(0);
        expect(wrapped.find('Field[name="password"]').length).toBe(0);
        expect(wrapped.find('button[name="logout"]').length).toBe(1);
    });
    it('calls the logOut action on button click', () => {
        expect(logOutActionSpy).toHaveBeenCalledTimes(0);
        wrapped.setProps({authenticated: true});
        wrapped.find('button[name="logout"]').simulate('click');
        expect(logOutActionSpy).toHaveBeenCalledTimes(1);
    });
});