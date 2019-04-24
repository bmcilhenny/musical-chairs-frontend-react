import React from 'react';
import { Image, Grid, Button, Reveal, Header} from 'semantic-ui-react';

const PlaylistCard = (props) => {
    const {playlist, handleOpen} = props;
    return (
        <Grid.Column>
                <Reveal animated='fade' onClick={handleOpen}>
                    <Reveal.Content visible>
                        <Image  src={playlist.imageUrl} size='medium'/>
                    </Reveal.Content>
                    <Reveal.Content hidden>
                        <Image  src={playlist.imageUrl} size='medium'/>
                    </Reveal.Content>
                </Reveal>
                    <Header as='h5' style={{color: 'white', marginBlockStart: '0.5em'}}>
                        {playlist.name}
                        <Header.Subheader style={{color: '#969696'}}>{playlist.total} song{playlist.total > 1 ? 's' : null}</Header.Subheader>
                    </Header>
        </Grid.Column>
    )
 }

 export default PlaylistCard;