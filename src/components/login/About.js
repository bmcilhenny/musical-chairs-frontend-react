import React from 'react';
import {handleTokenExpired} from '../../util/Spotify';
import {Segment, Grid, Header, Button, Image } from 'semantic-ui-react';
import { Element  } from 'react-scroll';

const About = ({handlePushToHome}) => {
    return (
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
                        <Button positive size='huge' onClick={() => handleTokenExpired(handlePushToHome)} >Start Playing</Button>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Element>
        </Segment>
    )
}

export default About;