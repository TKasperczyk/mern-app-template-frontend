import React from 'react';
import enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Root from '../../Root';
import {Home} from '../Home';
import Authentication from '../Authentication';

enzyme.configure({adapter: new Adapter()});
let historyMock = [];
let wrapped;

const countHistoryOccurences = (ofWhat) => {
    const index = historyMock.sort().indexOf(ofWhat);
    if (index >= 0){
        return historyMock.length - historyMock.sort().indexOf(ofWhat);
    } else { 
        //index = -1 when ofWhat isn't present in the array
        return 0;
    }
};
const remount = (authenticated = false) => {
    jest.clearAllMocks();
    historyMock = [];
    const Composed = Authentication(Home);
    wrapped = enzyme.mount(
        <Root initialState={{auth: {authenticated}}}>
            <Composed history={historyMock} authenticated={authenticated}></Composed>
        </Root>
    );
};

describe('<Authentication />', () => {
    beforeEach(() => {
        remount();
    });
    afterEach(() => {
        wrapped.unmount();
    });
    it('should render the child component', () => {
        expect(wrapped.find(Home).length).toBe(1);
    });
    it('should push /signin to history if not authenticated upon construction', () => {
        expect(countHistoryOccurences('/signin')).toBe(1);
    });
    it('should push /signin to history if not authenticated upon update', () => {
        expect(countHistoryOccurences('/signin')).toBe(1);
        //Trigger componentDidUpdate
        wrapped.setProps({});
        expect(countHistoryOccurences('/signin')).toBe(2);
    });
    it('should not push /signin to history if authenticated upon construction', () => {
        expect(countHistoryOccurences('/signin')).toBe(1);
        remount(true);
        expect(countHistoryOccurences('/signin')).toBe(0);
    });
    it('should not push /signin to history if authenticated upon update', () => {
        remount(true);
        //Trigger componentDidUpdate
        wrapped.setProps({
            children: React.cloneElement(wrapped.props().children, {authenticated: true})
        });
        expect(countHistoryOccurences('/signin')).toBe(0);
    });
});