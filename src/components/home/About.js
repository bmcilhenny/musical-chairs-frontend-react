import React from 'react';
import { Segment, Grid, Header, Button, Image } from 'semantic-ui-react';

const About = () => {
    return (
        <Grid container stackable verticalAlign='middle'>
            <Grid.Row style={{ marginBottom: '2em' }}>
                <Grid.Column textAlign='center'>
                    <Header as='h1' style={{ fontSize: '4em', color: 'white' }}>
                        How to Play
                    </Header>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={8}>
                    <Header as='h3' style={{ fontSize: '2em', color: 'white' }}>
                        What you'll need
                </Header>
                    <List divided verticalAlign='middle' inverted style={{ fontSize: '1.33em' }}>
                        <List.Item>
                            <List.Content>
                                <List.Header >Friends</List.Header><span>Best played with a minimum of 3 people.</span>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header >Beverages</List.Header><span>Lots is preferred. Water to adult beverages.</span>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header >Solo Cups</List.Header><span>The red ones are good.</span>
                            </List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content>
                                <List.Header >A Spotify-enabled device</List.Header><span>Make sure the device has Spotify opened and if it's a phone, make sure it doesn't lock itself.</span>
                            </List.Content>
                        </List.Item>

                    </List>
                    <Header as='h3' style={{ fontSize: '2em', color: 'white' }}>
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
        </Grid>
    )
}

export default About;