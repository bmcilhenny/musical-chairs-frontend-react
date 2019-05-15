import React, {Fragment} from 'react';
import {Transition, Modal, Container, Icon, Header, Button} from 'semantic-ui-react';

const GameOverGameModal = ({numPlayers, selectedDevice, handleClose, startRound, loadingGame, action}) => {
    return (
        <Fragment>
            <Transition animation='horizontal flip' duration={1000} visible={action} >
                <Header as='h1' textAlign='center'>
                    <Header.Content>
                        Thanks for guzzling
                    </Header.Content>
                </Header>
            </Transition>
            <Modal.Content>
                <Container textAlign='center' >
                    <Transition animation='fly down' duration={1000} visible={action}>
                        <Header as='h1'>
                            <Header.Content>
                                GAME OVER
                            </Header.Content>
                        </Header>
                    </Transition>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon disabled={true}>
                    <Icon name='play' />
                    Resume
                </Button>
                <Button 
                    positive icon='question' 
                    labelPosition='right' 
                    content='Play Again' 
                    disabled={numPlayers && selectedDevice ? false : true}
                    onClick={startRound}
                    loading={loadingGame}
                />
            </Modal.Actions>
        </Fragment>
    )
}

export default GameOverGameModal;