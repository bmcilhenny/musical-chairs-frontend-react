import React, {Fragment} from 'react';
import {Transition, Modal, Container, Label, Icon, Header, Button} from 'semantic-ui-react';

const DrinkGameModal = ({playlist, roundsLeft, action, numPlayerOptions, handlePlayersChange, numPlayers, deviceOptions, handleDeviceChange, selectedDevice, handleClose, startRound, loadingGame}) => {
    const roundsRemaining = roundsLeft === 1 ? <Label size='large' color='red'>The Last Round</Label> : (
        <Fragment>
            <Label circular color='green'>{roundsLeft}</Label>
            <span>rounds remaining</span>
        </Fragment>
    )
    
    return (
        <Fragment>
            {/* will need to add styling here to keep same size */}
            <Modal.Header as='h2'></Modal.Header>
            <Modal.Content>
                <Container textAlign='center' verticalAlign='center' >
                    <Transition animation='fly down' duration={1000} visible={action}>
                        <Header as='h1'>
                            <Header.Content>
                                DRINK
                            </Header.Content>
                        </Header>
                    </Transition>
                    {roundsRemaining}
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon disabled={true}>
                    <Icon name='play' />
                    Resume
                </Button>
                <Button 
                    positive
                    icon 
                    labelPosition='right'
                    disabled={true}
                    loading={loadingGame}
                >
                Skip
                <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
        </Fragment>
    )
}

export default DrinkGameModal;