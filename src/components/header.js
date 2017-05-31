import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router'; //eslint-disable-line no-unused-vars
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import '../styles/header.css';
import { LinkContainer } from 'react-router-bootstrap';


class Header extends React.Component {
    constructor(props) {
        super(props)
        this.renderLinks = this.renderLinks.bind(this)
    }

    renderLinks() {
        if(this.props.isUserLoggedIn) {
            return [
                <LinkContainer to='/chat' eventKey={1}>
                    <NavItem className="chat-home">Chat Room</NavItem>
                </LinkContainer>,
                <Link to='/signout' eventKey={2}>
                    <NavItem className="signout-button">Sign Out</NavItem>
                </Link>
            ]
        }
        else {
            return [
                <LinkContainer to='/signup' eventKey={1}>
                    <NavItem className="signup-button">Sign Up</NavItem>
                </LinkContainer>,
                <LinkContainer to='/login' eventKey={2}>
                    <NavItem className="signin-button">Login | Demo</NavItem>
                </LinkContainer>
            ]
        }
    }

    render() {
        return(
            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <LinkContainer to='/'>
                            <NavItem eventKey={1} className="brand">ThinkGames</NavItem>
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

export default connect(mapStateToProps)(Header)
