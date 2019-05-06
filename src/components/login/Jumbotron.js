import React from 'react';
import {Grid, Header, Button, Image, Icon, Transition } from 'semantic-ui-react';
import { Link  } from 'react-scroll';
import { setUpSpotifyAuthorization } from '../../util/Spotify';
import {FINDING_NEMO_URL, KHRUANGBIN_URL, MILEY_URL, GALACTIC_URL, BRUCE_URL, POGO_URL, DAFT_URL, KANYE_URL } from '../../constants';

const styles = {
    imageStyle: {
        boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
}

const Jumbotron = ({visible}) => {
    return (
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
                <Transition animation='bounce' duration={2000} visible={visible}>
                <Link activeClass="active" to="About Section" spy={true} smooth={true} duration={1000}>
                    <Button circular icon='chevron down' inverted />
                </Link>
                </Transition>
            </Grid.Row>
        </Grid>
    )
}

export default Jumbotron;
