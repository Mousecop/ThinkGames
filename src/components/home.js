import React from 'react';
import { Col, Row, Grid } from 'react-bootstrap';
import Header from './header' //eslint-disable-line no-unused-vars
import { Link } from 'react-router'; //eslint-disable-line no-unused-vars
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/action';
import '../styles/grid.css'
import '../styles/home.css'
// import img from '.../public/images/computer-image.jpg'

class Home extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.messageHistory()
    }

    render() {
        const spanStyle = {
            borderBottom: '2px solid #2C8C99'
        }
        const backgroundImage = {
            background: 'url(http://wallpapercave.com/wp/rJRFZZ8.png)no-repeat center',
            backgroundSize: 'cover',
            
        }
        return(
            <div className="home-container">
                <Header />
                <div className="title-section" style={backgroundImage}>
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
                    <h3 className="about-title">What is <span style={spanStyle}>ThinkGames?</span></h3>
                    <div className="row">
                        <div className="col-6">
                            <div className="about-info">
                                <p className="info-text">ThinkGames is the place for people to talk about anything game related. From League of Legends to Dungeon and Dragons. It is all welcome here! So come on by and have fun chatting in real time with your friends or make some new ones! GL HF!</p>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="info-pic">
                                <img src="https://content.screencast.com/users/j.askew/folders/Jing/media/3e0ab44d-ae33-4529-a344-58a7d16018f0/2017-06-02_1612.png" width="400" height="350" className="info-img"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="signup-section">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="signup-header">Create Your Account Today!</h2>
                            <Link to="/signup" className="signup-link">Sign Up</Link>
                        </div>
                    </div>
                </div>
                <footer>
                    <p>@ <a href="https://github.com/Mousecop">Jacob Askew</a></p>
                </footer>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    messageHistory() {
        dispatch(actions.fetchMessages())
    }
})

export default connect(null, mapDispatchToProps)(Home)