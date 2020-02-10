import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Root from '../../Root';
import App from '../App';
import history from '../../history';
import {Home} from '../Home';
import {SignIn} from '../SignIn';

enzyme.configure({adapter: new Adapter()});
let wrapped;

describe('<App />', () => {
    beforeEach(() => {
        wrapped = enzyme.mount(
            <Root initialState={{auth: {authenticated: false}}}>
                <App />
            </Root>
        );
    });
    afterEach(() => {
        wrapped.unmount();
    });
    it('displays the SignIn component when not logged in', () => {
        expect(wrapped.find(SignIn).length).toBe(1);
    });
    it('displays the Home component when logged in', () => {
        wrapped = enzyme.mount(
            <Root initialState={{auth: {authenticated: true}}}>
                <App />
            </Root>
        );
        history.push('/');
        wrapped.update();
        expect(wrapped.find(Home).length).toBe(1);
    });
});