import React from 'react';
import { Image, Grid, Button, Header} from 'semantic-ui-react';

const PlaylistCard = (props) => {
    const {playlist, handleOpen} = props;
    return (
        <Grid.Column>
            <div onClick={handleOpen}>
                <Image  src={playlist.imageUrl} style={{cursor: 'pointer'}} size='medium' as='a'/>
                <Header as='h5' style={{color: 'white', marginBlockStart: '0.5em'}}>
                {playlist.name}
                    <Header.Subheader style={{color: '#969696'}}>{playlist.total} song{playlist.total > 1 ? 's' : null}</Header.Subheader>
                </Header>
            </div>
        </Grid.Column>
    )
 }

 export default PlaylistCard;