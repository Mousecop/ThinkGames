import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/action';


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.renderAlert = this.renderAlert.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault();

        //Grab values from inputs
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const email = this.refs.email.value;

        this.props.userSignUp({username, email, password});
        this.props.currentUser(username);
        this.form.reset()
    }

    renderAlert() {
        if (this.props.errorMessage !== null) {
            return (
                <div className="error">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="signup-container">
                <div>
                    <h1 className="signup-title">Get started</h1>
                    <form className="signup-form" onSubmit={e => this.handleFormSubmit(e)} ref={ref => this.form = ref}>
                        <fieldset>
                            <label htmlFor="username" className="usernameLabel">Username</label>
                            <input type="text" id="username" ref="username" required/>
                        </fieldset>
                         <fieldset>
                            <label htmlFor="email" className="emailLabel">Email</label>
                            <input type="email" id="email" ref="email" required/>
                        </fieldset>
                         <fieldset>
                            <label htmlFor="password" className="passwordLabel">Password</label>
                            <input type="password" id="password" ref="password" required/>
                        </fieldset>
                        {this.renderAlert()}
                        <button action="submit" className="signup-submit-button">Sign up!</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errorMessage : state.errorMessage
})

const mapDispatchToProps = dispatch => ({
    userSignUp(userInfo){
        dispatch(actions.signupUser(userInfo))
    },
    currentUser(user) {
        dispatch(actions.currentUser(user))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)