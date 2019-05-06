import React from 'react';
import { Link } from 'react-scroll';
import {Segment, Container, Grid, Header, List } from 'semantic-ui-react';
import { GITHUB_URL } from '../../constants';

const Footer = () => {
    return (
        <Segment inverted vertical style={{ padding: '5em 0em' }}>
            <Container>
                <Grid divided inverted stackable>
                    <Grid.Row>
                        <Grid.Column width={3}>
                        <Header inverted as='h4' content='About' />
                        <List link inverted>
                            <List.Item as='a' href='/home'>Home</List.Item>
                            <div className='footerAbout'>
                                    <Link  className='footerAbout' to="About Section" spy={true} smooth={true} duration={1000}>
                                        About
                                    </Link>
                                {/* </List.Item> */}
                            </div>
                            <List.Item as='a' href={GITHUB_URL} >Github</List.Item>
                        </List>
                        </Grid.Column>
                        <Grid.Column width={13}>
                        <Header as='h4' inverted>
                            A Note to the Reader
                        </Header>
                        <p>
                            Thanks for making it this far! I am looking for a Full Stack position on a team that takes pride in collaborating and mentorship.
                        </p>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Container>
        </Segment>  
    )
}

export default Footer;

