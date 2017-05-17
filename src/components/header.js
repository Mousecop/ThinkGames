import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; //eslint-disable-line no-unused-vars

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.renderLinks = this.renderLinks.bind(this)
    }

    renderLinks() {
        if(this.props.isUserLoggedIn) {
            return [
                <Link to='/' key={0}>
                    <li className="brand">ThinkGames</li>
                </Link>,
                <Link to='/signout' key={1}>
                    <li className="signout-button">Sign Out</li>
                </Link>
            ]
        }
        else {
            return [
                <Link to='/' key={0}>
                    <li className="brand">ThinkGames</li>
                </Link>,
                <Link to='#about' key={1}>
                    <li className="signup-button">About</li>
                </Link>,
                <Link to='/signup' key={2}>
                    <li className="signup-button">Sign Up</li>
                </Link>,
                <Link to='/login' key={3}>
                    <li className="signin-button">Login</li>
                </Link>
            ]
        }
    }

    render() {
        return(
            <nav>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

const mapStateToProps = state => ({
    isUserLoggedIn : state.isUserLoggedIn
})

export default connect(mapStateToProps)(Header)
