import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; //eslint-disable-line no-unused-vars
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import '../styles/header.css';
import * as actions from '../actions/action';
import { LinkContainer } from 'react-router-bootstrap';


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.renderLinks = this.renderLinks.bind(this)
    }

    renderLinks() {
        if(this.props.isUserLoggedIn) {
            return [
                <LinkContainer to='/chat' key={1}>
                    <NavItem className="chat-home" eventKey={1}>Chat Room</NavItem>
                </LinkContainer>,
                <LinkContainer to='/signout' key={2}>
                    <NavItem className="signout-button" eventKey={2} onClick={this.props.logout}>Sign Out</NavItem>
                </LinkContainer>
            ]
        }
        else {
            return [
                <LinkContainer to='/signup' key={1}>
                    <NavItem className="signup-button" eventKey={1}>Sign Up</NavItem>
                </LinkContainer>,
                <LinkContainer to='/login' key={2}>
                    <NavItem className="signin-button" eventKey={2}>Login | Demo</NavItem>
                </LinkContainer>
            ]
        }
    }

    render() {
        return(
            <Navbar inverse collapseOnSelect fixedTop>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to='/'>
                            <NavItem key={1} className="brand" eventKey={1}>ThinkGames</NavItem>
                        </LinkContainer>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight>
                        {this.renderLinks()}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

const mapStateToProps = state => ({
    isUserLoggedIn : state.isUserLoggedIn
})
const mapDispatchToProps = dispatch => ({
    logout() {
        dispatch(actions.logoutUser())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
