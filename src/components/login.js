import React from 'react';
import {connect} from 'react-redux';

class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit(e) {
        e.preventDefault()
        
    }

    render() {
        return (
            <div className="login-container">
                <h1 className="login-header">Welcome back to ThinkGames!</h1>
                <form className="login-form">

                    <label htmlFor="username">Username: </label>
                    <input type="text" placeholder="Enter Username" id="username" ref="username"/>

                    <label htmlFor="password">Password: </label>
                    <input type="password" placeholder="Enter Password" id="password" ref="password"/>

                    <button type="submit">Sign in!</button>
                </form>
            </div>
        )
    }
}

export default Login;