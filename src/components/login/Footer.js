import React from 'react';
import {Segment, Container, Grid, Header, List } from 'semantic-ui-react';

const Footer = () => {
    return (
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
    )
}

export default Footer;

