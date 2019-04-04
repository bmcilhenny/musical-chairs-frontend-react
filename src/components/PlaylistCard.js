import React from 'react';
import { Card, Image, Grid, Button} from 'semantic-ui-react';

const PlaylistCard = (props) => {
    const {playlist, selected, handlePlaylistSelect, handleOpen} = props;
    return (
        <Grid.Column>
        <Card onClick={() => {
            handlePlaylistSelect(playlist.id);
            handleOpen();
        }}>
            <Card.Content>
            <Image src={playlist.imageUrl} />
            <br />
            <br />
            <Card.Header textAlign='center'>{playlist.name}</Card.Header>
            <Card.Meta>{playlist.total} songs</Card.Meta>
            </Card.Content>
            {selected ?  
            <Button attached='bottom' color='green'>Selected</Button> : <Button attached='bottom'>Select</Button>}
        </Card>
        </Grid.Column>
    )
 }

 export default PlaylistCard;