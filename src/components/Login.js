import React, {Component, Fragment} from 'react';
import { setUpSpotifyAuthorization } from '../util/Spotify';
import { Button, Grid, Header, Icon, Image, Dropdown, Menu, Transition, Segment, Container, List } from 'semantic-ui-react';
import QueryString from 'querystring';
import {FINDING_NEMO_URL, KHRUANGBIN_URL, MILEY_URL, GALACTIC_URL, BRUCE_URL, POGO_URL, DAFT_URL, KANYE_URL, BASE_URL } from '../constants';
import { Link, Element  } from 'react-scroll'


const styles = {
    imageStyle: {
        boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
}

const Navbar = ({loggedIn}) => {
    return (
        <Menu attached='top' style={{backgroundColor: 'transparent'}} borderless inverted >
            <Menu.Item position='left'>
                <Header as='h3' inverted >
                    <Icon name='beer' /> Musical Cheers
                </Header>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name='home' href={loggedIn ? BASE_URL : '/login'} />
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
    )
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
                <div className='login-form' style={{
                    backgroundColor: '#509BF5',
                    backgroundImage: '-webkit-gradient(linear, left top, right top, from(#C074B2), to(#8AB5E8))',
                    backgroundImage: 'linear-gradient(90deg, #C074B2, #8AB5E8)',
                    color: 'white'
                }}>
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
                                <Button circular icon='chevron down' inverted onClick={this.handleScroll}/>
                            </Link>
                            </Transition>
                        </Grid.Row>
                    </Grid>
                </div>
                <Segment style={{ padding: '8em 0em' }} vertical>
    <Element name="About Section">
        <Grid container stackable verticalAlign='middle'>
            <Grid.Row style={{marginBottom: '2em'}}>
                <Grid.Column textAlign='center'>
                    <Header as='h1' style={{ fontSize: '4em'}}>
                        About
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column width={8}>
                <Header as='h3' style={{ fontSize: '2em' }}>
                The Deep History of Musical Cheers 
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                What began as a way to pass the time at boring parties has blossomed into an international sports and heritage past-time for ages. Musical chairs meets flip cup meets automated music selection. Cheers.
                </p>
                <Header as='h3' style={{ fontSize: '2em' }}>
                How to Play
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                    However many players will be playing, place that many solo cups around the table. Then pour about a 1/5 of your drink of choice into each cup. Choose your playlist, your players, your device (make sure spotify is open on either your laptop or phone at all times, otherwise those devices won't appear in the set up game screen), and begin round. Users walk (read dance) around the table till the music stops, then it's flip cup time. The last person to flip their cup is out. Remove that cup from the table. Refill, then play the another round until one guzzler remains standing. Rinse. Repeat. Enjoy.
                </p>
            </Grid.Column>
            <Grid.Column floated='right' width={6}>
                <Image bordered rounded size='large' src='https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260' />
            </Grid.Column>
            </Grid.Row>
            <Grid.Row>
            <Grid.Column textAlign='center'>
                <Button positive size='huge' href={this.myRef}>Start Playing</Button>
            </Grid.Column>
            </Grid.Row>
        </Grid>
    
    </Element>
    </Segment>
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
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
      <Container>
        <Grid divided inverted stackable>
          <Grid.Row>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='About' />
              <List link inverted>
                <List.Item as='a'>Home</List.Item>
                <List.Item as='a'>About</List.Item>
                <List.Item as='a'>Github</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as='h4' content='Services' />
              <List link inverted>
                <List.Item as='a'>None</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header as='h4' inverted>
                A Note to the Reader
              </Header>
              <p>
                Thanks for making it this far! I am looking for a Full Stack position on a team that takes pride in collaboration and mentorship.
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Segment>
            </Fragment>
        )
    }
}

export default Login;