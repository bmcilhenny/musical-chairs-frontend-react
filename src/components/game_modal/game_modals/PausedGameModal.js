import React, {Fragment} from 'react';
import {Transition, Modal, Container, Image, Icon, Header, Button, Label} from 'semantic-ui-react';
import { cleanArtistNames} from '../../../util/DataCleaner';

const PausedGameModal = ({playlist, currentTrack, handleResume, handleSkip, animation, roundsLeft, numPlayers, selectedDevice, handleClose, loadingGame}) => {
    const roundsRemaining = roundsLeft === 1 ? <Label size='large' color='red'>The Last Round</Label> : <Fragment><Label circular color='green'>{roundsLeft}</Label><span>rounds remaining</span></Fragment>
    return (
        <Fragment>
            <Modal.Header >
                <Header as='h1' textAlign='center'>
                    <Header.Content>
                        {currentTrack.item.name}
                        <Header.Subheader>by {cleanArtistNames(currentTrack)}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Modal.Header>
            <Modal.Content>
                <Container textAlign='center' >
                    <Image 
                        centered 
                        size='small' 
                        src={currentTrack.item.album.images[1].url} 
                        label={{ as: 'a', color: 'green', corner: 'left', icon: 'pause' }}
                    />
                    <Header as='h3'>
                        <Header.Content>
                            {playlist.name}
                            <Header.Subheader>Your selected Playlist</Header.Subheader>
                        </Header.Content>
                    </Header>
                    {roundsRemaining}
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon onClick={handleResume}>
                    <Icon name='play' />
                    Resume
                </Button>
                <Button 
                    positive
                    icon 
                    labelPosition='right'
                    disabled={numPlayers && selectedDevice ? false : true}
                    onClick={handleSkip}
                    loading={loadingGame}
                >
                Skip
                <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
        </Fragment>
    )
}

export default PausedGameModal;