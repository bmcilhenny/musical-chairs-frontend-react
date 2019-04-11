import React, { Component, Fragment } from 'react';
import { times } from 'lodash';
import Navbar from './Navbar';
import { Card, Divider, Placeholder, Button, Icon, Input, Container, Grid } from 'semantic-ui-react';

class Loading extends Component {
    render() {
      const cards = times(18, () => {
        return (
          <Grid.Column>
            <Card >
              <Card.Content>
                <Placeholder>
                  <Placeholder.Image rectangular />
                  <br/>
                  <br/>
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder>
              </Card.Content>
              <Button attached='bottom' disabled>Select</Button>
            </Card>
          </Grid.Column>
        )
      });
      return (
        <Fragment>
            <Navbar />
            <br/>
            <Grid centered columns={1}>
              <Grid.Row>
                <Placeholder inverted >
                  <Placeholder.Image  style={{ height: 50, width: 50}} />
                  <Placeholder.Paragraph>
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Paragraph>
                </Placeholder>
              </Grid.Row>
              <Grid.Row>
                <br />
                <br />
                <Input 
                      icon={<Icon name='search' />} 
                      placeholder="Search for a playlist"
                      disabled
                />
              </Grid.Row>
            </Grid>
            <Divider inverted />
            <Grid stackable columns={6} style={{width: '80%'}} container>
              { cards }
            </Grid>
        </Fragment>
      )
    }
  }

  export default Loading;