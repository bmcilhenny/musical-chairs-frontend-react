import React from 'react';
import {Segment, Container, Header, Button} from 'semantic-ui-react';
import { Link } from 'react-scroll';

const ReadMore = () => {
    return (
        <Segment style={{ padding: '8em 0em' }} vertical>
            <Container text>
                <Header as='h3' style={{ fontSize: '2em' }}>
                Breaking down musical barriers, with APIs
                </Header>
                <p style={{ fontSize: '1.33em' }}>
                Instead of forcing your least athletic friend to play dj during your next house party, why not just use Musical Cheers? This insanely awesome app makes sure your least athletic friend will play at least 1 round of musical cheers by automating the dj-process.
                </p>
                <Link activeClass="active" to="About Section" spy={true} smooth={true} duration={1000}>
                    <Button as='a' size='large'>
                        Read More
                    </Button>
                </Link>
            </Container>
        </Segment>
    )
}

export default ReadMore;