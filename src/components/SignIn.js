import React from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {signIn, logOut, signUp} from '../actions';

export class SignIn extends React.Component{
    state = {};
    /**
     * @description submits the form and logs in the user
     * @param {Object} [values] it should contain "username" and "password" properties
     */
    submitSignInHandler = (values) => {
        this.props.signIn(values);
    };
    /**
     * @description submits the form and creates a new user, then logs him in
     * @param {Object} [values] it should contain "username" and "password" properties
     */
    submitSignUpHandler = (values) => {
        this.props.signUp(values);
    };
    /**
     * @description logs out the user by calling the logOut action (destroys localStorage)
     */
    logOutHandler = () => {
        this.props.logOut();
    };
    /**
     * @description returns JSX with an error message if there is one in props
     * @returns {EJX} a div with the error message
     */
    errorMessage = () => {
        //console.log(`calledwith ${this.props.errorMessage}`);
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
                    <form>
                        <Field name="username"
                            component="input"
                            type="text"
                            placeholder="Username" 
                        />
                        <Field name="password" 
                            component="input"
                            type="password"
                            placeholder="Password" 
                        />
                        <button className="blue" onClick={handleSubmit(this.submitSignInHandler)} name="signin">Sign In</button>
                        <button className="blue" onClick={handleSubmit(this.submitSignUpHandler)} name="signup">Sign Up</button>
                    </form>
                    {this.errorMessage()}
                </div>
            );
        } else {
            return (
                <button onClick={this.logOutHandler} name="logout">Log out</button>
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

const reduxFormSignIn = reduxForm({
    form: 'SignIn'
})(SignIn);

export default connect(mapStateToProps, {signIn, logOut, signUp})(reduxFormSignIn);