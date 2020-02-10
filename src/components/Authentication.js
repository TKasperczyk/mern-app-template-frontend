/**
 * HOC component allowing to secure other components from unauthorized access
 * Redirects the user to the sign page if he's not authenticated and tries to access the child (composed) component
 */

import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export default (ComposedComponent) => {
    class Authentication extends React.Component{ // eslint-disable-line no-unused-vars
        PropTypes = {
            router: PropTypes.object
        };
        constructor(props){
            super(props);
            if (!this.props.authenticated){
                this.props.history.push('/signin');
            }
        }
        componentDidUpdate(nextProps){
            if (nextProps.authenticated){
                this.props.history.push('/signin');
            }
        };
        render(){
            return (
                <ComposedComponent {...this.props} />
            );
        };
    };

    const mapStateToProps = (state) => {
        return {
            authenticated: state.auth.authenticated
        };
    };

    return connect(mapStateToProps, {})(Authentication);
};
