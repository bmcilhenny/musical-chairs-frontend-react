import React, { Component, Fragment } from 'react';
import { times } from 'lodash';
import { Divider, Placeholder, Icon, Input, Grid } from 'semantic-ui-react';

class Loading extends Component {
    render() {
      const cards = times(30, () => {
        return (
          <Grid.Column>
            <Placeholder inverted >
                <Placeholder.Image  style={{ height: 150, width: 150}} />
                <Placeholder.Paragraph>
                  <Placeholder.Line length='very long'/>
                  <Placeholder.Line />
                </Placeholder.Paragraph>
            </Placeholder>
          </Grid.Column>
        )
      });
      return (
        <Fragment>
            <br/>
            <Grid centered columns={1}>
              <Grid.Row >
                <Placeholder inverted >
                  <Placeholder.Image  style={{ height: 50, width: 150}} />
                  <br />
                  <Placeholder.Paragraph>
                    <Placeholder.Line length='very long'/>
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
            <br />
            <br />
            <Grid doubling columns={6} style={{width: '90%'}} container>
              { cards }
            </Grid>
        </Fragment>
      )
    }
  }

  export default Loading;