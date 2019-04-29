import React, {Component, Fragment} from 'react';
import { setUpSpotifyAuthorization } from '../util/Spotify';
import { Button, Grid, Header, Icon, Image, Dropdown, Menu } from 'semantic-ui-react';
import QueryString from 'querystring';
// import Navbar from '../components/Navbar';
import {FINDING_NEMO_URL, KHRUANGBIN_URL, MILEY_URL, GALACTIC_URL, BRUCE_URL, POGO_URL, BASE_URL } from '../constants';

const trigger = (
        <span>
            <Image avatar src={FINDING_NEMO_URL} /> Profile
        </span>
    )

const options = [
  { key: 'user', text: 'Log out' },
  { key: 'settings', text: 'Settings'}
]

const DropdownImageTriggerExample = () => <Dropdown trigger={trigger} options={options} pointing='top left'/>

const Navbar = ({loggedIn}) => {
    return (
        <Menu attached='top' style={{backgroundColor: 'transparent', width: '90%'}} borderless inverted >
            <Menu.Item position='left'>
                <Header as='h3' inverted>
                    <Icon name='beer' /> Musical Cheers
                </Header>
            </Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name='home' href={loggedIn ? BASE_URL : '/login'} />
                <Menu.Item name='about' />
                <Menu.Item name='github' href='https://github.com/bmcilhenny/musical-chairs-frontend-react'/>
                <Menu.Item>
                    <Image avatar src={FINDING_NEMO_URL} />
                    Profile
                    <Dropdown simple></Dropdown>
                </Menu.Item>
                {/* <DropdownImageTriggerExample /> */}
            </Menu.Menu>
        </Menu>
    )
}


class Login extends Component {
    state = {}

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
                    {/*
                    Heads up! The styles below are necessary for the correct render of this example.
                    You can do same with CSS, the main idea is that all the elements up to the `Grid`
                    below must have a height of 100%.
                */}
                    {/* <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                    `}
                    </style> */}
                    <Navbar loggedIn={false}/>
                    <br />
                    <br />
                    <br />

                    <Grid >
                        <Grid.Column width={7}>
                            <Header as='h1' inverted>
                                <Header.Content>
                                    Looking to play musical chairs?
                                    <Header.Subheader>Leave the dj-ing to us.</Header.Subheader>
                                </Header.Content>
                            </Header>
                            <Button positive size='large' circular onClick={setUpSpotifyAuthorization}>
                                <Icon name='spotify' /> OPEN WEB PLAYER
                            </Button>
                        </Grid.Column>

                        <Grid.Column width={9}>
                            <Grid doubling columns={3} style={{width: '90%'}}>       
                                <Grid.Column>
                                    <Image  style={{ height: 200, width: 200, boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={BRUCE_URL} />
                                </Grid.Column> 
                                <Grid.Column>
                                    <Image  style={{ height: 200, width: 200, boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={MILEY_URL} />
                                </Grid.Column> 
                                <Grid.Column>
                                    <Image  style={{ height: 200, width: 200, boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={FINDING_NEMO_URL} />
                                </Grid.Column> 
                                <Grid.Column>
                                    <Image  style={{ height: 200, width: 200, boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={GALACTIC_URL} />
                                </Grid.Column> 
                                <Grid.Column>
                                    <Image  style={{ height: 200, width: 200, boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={KHRUANGBIN_URL} />
                                </Grid.Column> 
                                <Grid.Column>
                                    <Image  style={{ height: 200, width: 200, boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'}} src={POGO_URL} />
                                </Grid.Column> 
                            </Grid>
                        </Grid.Column>
                    </Grid>
                </div>

            </Fragment>
        )
    }
}

export default Login;