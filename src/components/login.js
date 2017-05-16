import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/action';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
        this.renderAlert = this.renderAlert.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        this.props.signIn({username, password})
        this.props.currentUser(username)
        this.form.reset();
    }

    renderAlert() {
        if (this.props.errorMessage !== '') {
            return (
                <div className="error">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="login-header">Welcome back to ThinkGames!</h1>
                <form className="login-form" onSubmit={e => this.handleSubmit(e)} ref={ref => this.form = ref}>
                    <fieldset>
                        <label htmlFor="username">Username: </label>
                        <input type="text" placeholder="Enter Username" id="username" ref="username"/>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="password">Password: </label>
                        <input type="password" placeholder="Enter Password" id="password" ref="password"/>
                    </fieldset>
                    {this.renderAlert()}
                    <button type="submit">Sign in!</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    errorMessage : state.errorMessage
})

const mapDispatchToProps = dispatch => ({
    signIn(userInfo) {
        dispatch(actions.signinUser(userInfo))
    },
    currentUser(username) {
        dispatch(actions.currentUser(username))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);