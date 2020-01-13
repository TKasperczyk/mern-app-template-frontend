import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {logIn, logOut} from '../actions';

class LogIn extends React.Component{
    state = {};
    submitHandler = (values) => {
        this.props.logIn(values);
    };
    logOutHandler = () => {
        this.props.logOut();
    };
    errorMessage = () => {
        if (this.props.errorMessage){
            return (
                <div>
                    Error: {this.props.errorMessage}
                </div>
            );
        }
    };
    render(){
        const {handleSubmit, authenticated} = this.props;
        if (!authenticated){
            return (
                <div className="form">
                    <form onSubmit={handleSubmit(this.submitHandler)}>
                        <Field name="login"
                            component="input"
                            type="text"
                            placeholder="Login" 
                        />
                        <Field name="password" 
                            component="input"
                            type="password"
                            placeholder="Password" 
                        />
                        <button type="submit" className="blue">Log In</button>
                    </form>
                    {this.errorMessage()}
                </div>
            );
        } else {
            return (
                <button onClick={this.logOutHandler}>Log out</button>
            );
        }
    };
};

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.error,
        authenticated: state.auth.authenticated
    };
};

const reduxFormLogIn = reduxForm({
    form: 'logIn'
})(LogIn);

export default connect(mapStateToProps, {logIn, logOut})(reduxFormLogIn);