import React, {Fragment} from 'react';
import {Transition, Modal, Label, Container, Image, Icon, Header, Button} from 'semantic-ui-react';
import { cleanArtistNames} from '../../../util/DataCleaner';

const DanceBeforeGameModal = ({roundsLeft, handlePause, playlist, action, currentTrack, handleSkip, numPlayers, selectedDevice, handleClose, loadingGame}) => {
    const roundsRemaining = roundsLeft === 1 ? <Label size='large' color='red'>The Last Round</Label> : (
        <Fragment>
            <Label circular color='green'>{roundsLeft}</Label>
            <span>rounds remaining</span>
        </Fragment>
    )

    return (
        <Fragment>
            <Transition animation='horizontal flip' duration={1000} visible={action} >
                <Header as='h3'>
                    <Header.Content>
                        Now Playing {currentTrack.item.name}
                        <Header.Subheader>by {cleanArtistNames(currentTrack)}</Header.Subheader>
                    </Header.Content>
                </Header>
            </Transition>
            <Modal.Content>
                <Container textAlign='center'>
                    <Transition animation='swing up' duration={1000} visible={action}>
                        <Image 
                            centered 
                            size='small' 
                            src={currentTrack.item.imageUrl} 
                            label={{ as: 'a', color: 'green', corner: 'left', icon: 'music' }}
                        />
                    </Transition>
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
                <Button icon='pause' content=' Pause' onClick={() => handlePause(false)} />
                <Button positive icon labelPosition='right' disabled={numPlayers && selectedDevice ? false : true} onClick={handleSkip} loading={loadingGame}>
                    Skip
                    <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
        </Fragment>
    )
}

export default DanceBeforeGameModal;