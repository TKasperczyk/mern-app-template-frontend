import React from 'react';
import {connect} from 'react-redux';
import {createSocket, logOut} from '../actions';

import Authentication from './Authentication';

export class Home extends React.Component{
    state = {pongPayload: null};

    logOutHandler = () => {
        this.props.logOut();
    };
    /**
     * @description allows to send socket.io events with the given eventName and payload. Ignores the call if the socket is not yet created
     * @param {String} [eventName] the name of the event that will be emitted
     * @param {*} [payload = null] the payload of the emitted event
     */
    socketEmitHandler = ({eventName, payload = null}) => {
        if (this.props.socket){
            this.props.socket.emit(eventName, payload);
        }
    };
    /**
     * @description creates all event handlers related to this component
     */
    socketEventsCreator(){
        this.props.socket.on('testPong', (payload) => {
            this.setState({pongPayload: payload});
        });
    };
    /**
     * @description creates a new socket only if the JWT token is defined - in theory it should always be defined because this component is wrapped by Authentication HOC
     */
    componentDidMount(){
        const token = this.props.token;
        if (token){
            this.props.createSocket({namespace: 'test', token});
        }
    };
    /**
     * @description waits for the socket to be initialized. Attaches event handlers after it is
     */
    componentDidUpdate(nextProps){
        if (this.props.socket !== nextProps.socket){
            this.socketEventsCreator();
        }
    };
    render(){
        return (
            <div>
                [{this.props.authenticated ? 'Authenticated' : 'Not authenticated'}]
                [Pong: {this.state.pongPayload}]
                <button onClick={() => this.socketEmitHandler({eventName: 'testPing'})}>Ping</button>
                <button onClick={this.logOutHandler}>Log out</button>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
        token: state.auth.token,
        socket: state.io.socket
    };
};

const connectedHome = connect(mapStateToProps, {
    createSocket, 
    logOut
})(Home);

//Protect the component with our auth HOC
export default Authentication(connectedHome);