import React, {Component, Fragment} from 'react';
import QueryString from 'querystring';
import LoginNavbar from '../navbars/LoginNavbar';
import About from './About';
import Footer from './Footer';
import Jumbotron from './Jumbotron';
import Quotes from './Quotes';
import { Button, Header, Segment, Container } from 'semantic-ui-react';
import {tokenExpired} from '../../helpers';
import {Link} from 'react-scroll';

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
            user: {}
        }
    }

    toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }));

    handleLogout = () => {
        this.setState({user: {}});
        localStorage.clear();
    }

    componentDidMount() {
        setInterval(() => this.toggleVisibility(), 2500);
        let spotifyAccessToken = JSON.parse(localStorage.getItem('spotify-access-token'));
        if (spotifyAccessToken) {
            const {_, expires} = spotifyAccessToken;
            if (!(tokenExpired(expires))) {
                let user = JSON.parse(localStorage.getItem('user'));
                this.setState({user: user})
            } else {
                localStorage.clear();
            }
        }
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
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        Breaking down musical barriers, with APIs
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        Instead of forcing your least athletic friend to play dj during your next house party, why not just use Musical Cheers? This insanely awesome app makes sure your least athletic friend will play at least 1 round of musical cheers by automating the dj-process.
                        </p>
                        <Link activeClass="active" to="About Section" spy={true} smooth={true} duration={1000}>
                            <Button as='a' size='large'>
                                Read More
                            </Button>
                        </Link>
                    </Container>
                </Segment>
                <Footer />
            </Fragment>
        )
    }
}

export default Login;