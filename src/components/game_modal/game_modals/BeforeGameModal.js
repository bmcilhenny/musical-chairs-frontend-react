import React, {Fragment} from 'react';
import {Transition, Modal, Container, Image, Icon, Header, Button} from 'semantic-ui-react';
import DropdownWithOptions from '../DropdownWithOptions';

const BeforeGameModal = ({playlist, numPlayerOptions, handlePlayersChange, numPlayers, deviceOptions, handleDeviceChange, selectedDevice, handleClose, startRound, loadingGame}) => {

    return (
        <Fragment>
            <Transition animation='jiggle' duration={1000} visible={true} >
                <Modal.Header as='h2'>
                    Set up your game below
                </Modal.Header>
            </Transition>
            <Modal.Content>
                <Container textAlign='center'>
                    <Image centered size='small' src={playlist.imageUrl} />
                    <Header as='h3'>
                        <Header.Content>
                            {playlist.name}
                            <Header.Subheader>Your Selected Playlist</Header.Subheader>
                        </Header.Content>
                    </Header>
                    <DropdownWithOptions
                        disabled={false} 
                        options={numPlayerOptions} 
                        placeholder='How many guzzlers will be guzzling this eve?'
                        handleChange={handlePlayersChange}
                        value={numPlayers}
                    />
                    <DropdownWithOptions 
                        disabled={false}
                        options={deviceOptions} 
                        placeholder='Select which device to stream music from..'
                        handleChange={handleDeviceChange}
                        value={selectedDevice}
                    />
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon disabled={true}>
                    <Icon name='play' />
                    Resume
                </Button>
                <Button 
                    positive icon='checkmark' 
                    labelPosition='right' 
                    content='Start' 
                    disabled={numPlayers && selectedDevice ? false : true}
                    onClick={startRound}
                    loading={loadingGame}
                />
            </Modal.Actions>
        </Fragment>
    )
}

export default BeforeGameModal;