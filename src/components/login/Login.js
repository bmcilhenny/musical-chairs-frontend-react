import React, {Component, Fragment} from 'react';
import QueryString from 'querystring';
import LoginNavbar from '../navbars/LoginNavbar';
import About from './About';
import Footer from './Footer';
import Jumbotron from './Jumbotron';
import Quotes from './Quotes';
import ReadMore from './ReadMore';
import {tokenExpired} from '../../helpers';

const styles = {
    jumboTron: {
        backgroundColor: '#509BF5',
        backgroundImage: '-webkit-gradient(linear, left top, right top, from(#C074B2), to(#8AB5E8))',
        backgroundImage: 'linear-gradient(90deg, #C074B2, #8AB5E8)',
        color: 'white'
    }
}

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            clicked: false,
            user: {}, 
            animationIntervalID: null
        }
    }

    toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }));

    handleLogout = () => {
        this.setState({user: {}});
        localStorage.clear();
    }

    componentDidMount() {
        const animationIntervalID = setInterval(() => this.toggleVisibility(), 2500);
        const spotifyAccessToken = JSON.parse(localStorage.getItem('spotify-access-token'));
        let user = {};
        if (spotifyAccessToken) {
            const {ignore, expires} = spotifyAccessToken;
            if (!(tokenExpired(expires))) {
                user = JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.clear();
            }
        }
        this.setState({animationIntervalID, user})
    }

    static getDerivedStateFromProps(nextProps) { 
        if (window.location.hash.length > 1) {
        const querystring = window.location.hash.slice(1);
        const query = QueryString.parse(querystring);
            if (query.access_token) {
            localStorage.setItem('spotify-access-token', JSON.stringify({token: query.access_token, expires: Date.now()}));
            nextProps.history.push('/home')
            }
        }
        return null;
    }

    componentWillUnmount() {
        clearInterval(this.state.animationIntervalID)
    }

    render() {
        return (
            <Fragment>
                <div className='login-form' style={styles.jumboTron}>
                    <LoginNavbar user={this.state.user} handleLogout={this.handleLogout} />
                    <br />
                    <br />
                    <br />
                    <Jumbotron visible={this.state.visible} />
                </div>
                <About />
                <Quotes />
                <ReadMore />
                <Footer />
            </Fragment>
        )
    }
}

export default Login;