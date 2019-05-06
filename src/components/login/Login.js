import React, {Component, Fragment} from 'react';
import { setUpSpotifyAuthorization } from '../../util/Spotify';
import QueryString from 'querystring';
import About from './About';
import Footer from './Footer';
import { Button, Grid, Header, Icon, Image, Dropdown, Menu, Transition, Segment, Container } from 'semantic-ui-react';
import {FINDING_NEMO_URL, KHRUANGBIN_URL, MILEY_URL, GALACTIC_URL, BRUCE_URL, POGO_URL, DAFT_URL, KANYE_URL } from '../../constants';
import { Link  } from 'react-scroll'



const styles = {
    jumboTron: {
        backgroundColor: '#509BF5',
        backgroundImage: '-webkit-gradient(linear, left top, right top, from(#C074B2), to(#8AB5E8))',
        backgroundImage: 'linear-gradient(90deg, #C074B2, #8AB5E8)',
        color: 'white'
    },
    imageStyle: {
        boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
}


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: true,
            clicked: false
        }
    }

    toggleVisibility = () => this.setState(prevState => ({ visible: !prevState.visible }));

    componentDidMount() {
        setInterval(() => this.toggleVisibility(), 2500)
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
                    <Menu attached='top' style={{backgroundColor: 'transparent'}} borderless inverted >
                        <Menu.Item position='left'>
                            <Header as='h3' inverted >
                                <Icon name='beer' /> Musical Cheers
                            </Header>
                        </Menu.Item>
                        <Menu.Menu position='right'>
                            <Menu.Item name='home' href={'/login'} />
                            <Menu.Item name='about' />
                            <Menu.Item name='github' href='https://github.com/bmcilhenny/musical-chairs-frontend-react'/>
                            <Menu.Item>
                                <Image avatar src={FINDING_NEMO_URL} />
                                <Dropdown text='Profile' pointing='top right'>
                                    <Dropdown.Menu >
                                        <Dropdown.Item text='Settings' />
                                        <Dropdown.Item text='Log out' />
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Item>
                        </Menu.Menu>
                    </Menu>
                    <br />
                    <br />
                    <br />
                    <Grid centered>
                        <Grid.Row >
                            <Grid.Column width={5} verticalAlign='middle' >
                                <Header as='h1' inverted>
                                        Looking to play musical chairs?
                                        <Header.Subheader>Leave the dj-ing to us. Automated musical chairs integrated with your Spotify-enabled devices.</Header.Subheader>
                                </Header>
                                <Button positive size='large' circular onClick={setUpSpotifyAuthorization}>
                                    <Icon name='spotify' inverted/> OPEN WEB PLAYER
                                </Button>
                            </Grid.Column>
                            <Grid.Column stackable width={8}>
                                <Grid columns={4} >       
                                    <Grid.Column>
                                        <Image  size='medium' style={styles.imageStyle} src={BRUCE_URL} />
                                    </Grid.Column> 
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={MILEY_URL} />
                                    </Grid.Column> 
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={FINDING_NEMO_URL} />
                                    </Grid.Column> 
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={GALACTIC_URL} />
                                    </Grid.Column> 
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={KHRUANGBIN_URL} />
                                    </Grid.Column> 
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={POGO_URL} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={DAFT_URL} />
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Image size='medium' style={styles.imageStyle} src={KANYE_URL} />
                                    </Grid.Column> 
                                </Grid>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <br/>
                        </Grid.Row>
                        <Grid.Row>
                            <Transition animation='bounce' duration={2000} visible={this.state.visible}>
                            <Link activeClass="active" to="About Section" spy={true} smooth={true} duration={1000}>
                                <Button circular icon='chevron down' inverted />
                            </Link>
                            </Transition>
                        </Grid.Row>
                    </Grid>
                </div>
                <About />
                <Segment style={{ padding: '0em' }} vertical>
                    <Grid celled='internally' columns='equal' stackable>
                        <Grid.Row textAlign='center'>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                            "This man is a genius"
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>- Mark Zuckerberg</p>
                        </Grid.Column>
                        <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
                            <Header as='h3' style={{ fontSize: '2em' }}>
                            "This is the funnest game I've ever played."
                            </Header>
                            <p style={{ fontSize: '1.33em' }}>
                            <Image avatar src='https://image.flaticon.com/icons/png/128/145/145850.png' />
                            My Mom
                            </p>
                        </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
                <Segment style={{ padding: '8em 0em' }} vertical>
                    <Container text>
                        <Header as='h3' style={{ fontSize: '2em' }}>
                        Breaking down musical barriers, with APIs
                        </Header>
                        <p style={{ fontSize: '1.33em' }}>
                        Instead of forcing your least athletic friend to play dj during your next house party, why not just use Musical Cheers? This insanely awesome app makes sure your least athletic friend will play at least 1 round of musical cheers by automating the dj-process.
                        </p>
                        <Button as='a' size='large'>
                        Read More
                        </Button>
                    </Container>
                </Segment>
                <Footer />
            </Fragment>
        )
    }
}

export default Login;