import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import Header from './header' //eslint-disable-line no-unused-vars
import { Link } from 'react-router'; //eslint-disable-line no-unused-vars
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/grid.css'
import '../styles/home.css'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="home-container">
                <Header />
                <div className="title-section">
                    <div className="row">
                        <div className="col-12">
                            <div className="title-container">
                                <h1 className="title">ThinkGames</h1>
                                <p className="title-about">The Place to Talk Games</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-section" classID="about">
                    <div className="row">
                        <div className="col-6">
                            <div className="about-info">
                                <p className="info-text">ThinkGames is the place for people to talk about anything game related. From League of Legends to Dungeon and Dragons. It is all welcome here! So come on by and have fun chatting in real time with your friends or make some new ones! GL HF!</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="info-pic">
                                <img src="https://placeholdit.imgix.net/~text?txtsize=28&bg=0099ff&txtclr=ffffff&txt=300%C3%97300&w=300&h=300" alt="placeholder image" className="img info-img"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="signup-section">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="signup-header">Create Your Account Today</h2>
                            <Link to="/signup" className="signup-link">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home