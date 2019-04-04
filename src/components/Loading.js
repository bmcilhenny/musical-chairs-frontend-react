import React, { Component } from 'react';
import { times } from 'lodash';
import { Card, Divider, Placeholder, Segment } from 'semantic-ui-react';

class Loading extends Component {
    render() {
      const cards = times(18, () => {
        return (
          <Card >
          <Card.Content>
            <Placeholder>
              <Placeholder.Image rectangular />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder>
          </Card.Content>
        </Card>
        )
      });
      return (
        <Segment inverted>
            <br/>
            <br/>
            <Placeholder inverted>
              <Placeholder.Line />
              <Placeholder.Image   />
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
            <br />
            <Divider inverted />
            <Card.Group itemsPerRow={6} style={{width: '80%'}}>
              { cards }
            </Card.Group>
        </Segment>
      )
    }
  }

  export default Loading;