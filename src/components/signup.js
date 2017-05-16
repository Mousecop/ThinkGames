import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/action';


class Signup extends React.Component {
    constructor(props) {
        super(props)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        // this.state = {
        //     errorMessage: ''
        // }
    }

    handleFormSubmit(e) {
        e.preventDefault();

        //Grab values from inputs
        const username = this.refs.username.value;
        const password = this.refs.password.value;
        const email = this.refs.email.value;
        // const passwordConfirm = this.refs.passwordConfirm.value;

        // this.validation(password, passwordConfirm, username)
        this.props.userSignUp({username, email, password});
        this.props.currentUser(username);
        this.form.reset()
    }

    // validation(password, passwordConfirm, username) {
    //     if (password !== passwordConfirm) {
    //         console.log('passwords dont match');
    //         this.setState({errorMessage: 'passwords do not match'})
    //     } else if (!username) {
    //         this.setState({
    //             errorMessage: 'Please enter a username'
    //         })
    //     } else {
    //         this.setState({
    //             errorMessage: ''
    //         })
    //     }
    // }

    /*renderAlert() {
        if (this.state.errorMessage !== '') {
            return (
                <div className="error">
                    <strong>Oops!</strong> {this.state.errorMessage}
                </div>
            )
        }
    }*/

    

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
                        {/*{this.renderAlert()}*/}
                        <button action="submit" className="signup-submit-button">Sign up!</button>
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    userSignUp(userInfo){
        dispatch(actions.signupUser(userInfo))
    },
    currentUser(user) {
        dispatch(actions.currentUser(user))
    }
})

export default connect(null, mapDispatchToProps)(Signup)