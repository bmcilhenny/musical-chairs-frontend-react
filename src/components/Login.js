import React, {Component, Fragment} from 'react';
import { setUpSpotifyAuthorization } from '../util/Spotify';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import QueryString from 'querystring';
import Navbar from '../components/Navbar'


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
                    backgroundImage: 'linear-gradient(90deg, #C074B2, #8AB5E8)'
                }}>
                    {/*
                    Heads up! The styles below are necessary for the correct render of this example.
                    You can do same with CSS, the main idea is that all the elements up to the `Grid`
                    below must have a height of 100%.
                */}
                    <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                        height: 100%;
                    }
                    `}
                    </style>

                        <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                            <Grid.Column style={{ maxWidth: 450 }}>
                                <Header as='h2' inverted textAlign='center'>
                                    <Icon name='beer' /> Musical Cheers
                                </Header>
                                <Button positive size='massive' circular onClick={setUpSpotifyAuthorization}>
                                    <Icon name='spotify' /> Login to Spotify
                                </Button>
                            </Grid.Column>
                        </Grid>
                </div>

            </Fragment>
        )
    }
}

export default Login;