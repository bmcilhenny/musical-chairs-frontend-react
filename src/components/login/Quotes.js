import React from 'react';
import {Segment, Grid, Image, Header } from 'semantic-ui-react';

const Quotes = () => {
    return (
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
    )
}

export default Quotes;