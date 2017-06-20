import React from 'react';
import {connect} from 'react-redux';
import Header from './header';
import * as actions from '../actions/action';
import '../styles/grid.css';
import '../styles/login.css'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleFormSubmit.bind(this)
        this.renderAlert = this.renderAlert.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        this.props.signIn({username, password})
        this.props.currentUser(username)
        this.form.reset();
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
            <div className="login-container">
                <Header />
                <div className="row">
                    <div className="col-12">
                        <h1 className="signup-title">Welcome back to ThinkGames!</h1>
                        <div className="demo-info">
                            <p>Demo Account info:</p>
                            <p className="demo-username">username: dev</p>
                            <p className="demo-password">password: dev</p>
                        </div>
                        <form className="signup-form" onSubmit={e => this.handleFormSubmit(e)} ref={ref => this.form = ref}>
                            <fieldset>
                                <input type="text" id="username" ref="username" required placeholder="Username"/>
                            </fieldset>
                            <fieldset>
                                <input type="password" id="password" ref="password" required placeholder="Password"/>
                            </fieldset>
                            {this.renderAlert()}
                            <button action="submit" className="signup-submit-button">Login!</button>
                        </form>
                    </div>
                </div>
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