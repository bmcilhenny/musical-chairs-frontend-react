import React from 'react';
import {Modal, Button, Icon} from 'semantic-ui-react';

const GameModalActions = ({gameStatus, numPlayers, selectedDevice, loadingGame, handlePause, handleClose, handleSkip, startRound, handleResume}) => {
    switch (gameStatus) {
        case 'async':
            return (
                <Modal.Actions>
                    <Button negative onClick={handleClose}>Cancel</Button>
                    <Button icon='pause' content=' Pause' loading={true} />
                    <Button positive icon labelPosition='right' disabled={numPlayers && selectedDevice ? false : true} onClick={handleSkip} loading={loadingGame}>
                        Skip
                        <Icon name='angle double right' />
                    </Button>
                </Modal.Actions>
            )
        case 'play':
            return (
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon='pause' content=' Pause' onClick={() => handlePause(false)} />
                <Button positive icon labelPosition='right' disabled={numPlayers && selectedDevice ? false : true} onClick={handleSkip} loading={loadingGame}>
                    Skip
                    <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
            )
        case 'paused': 
        return (
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
        )
        case 'drink': 
        return (
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
        )
        case 'gameOver':
            return (
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
            )
        case 'shuffle':
            return (
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon disabled={true}>
                    <Icon name='play' />
                    Resume
                </Button>
                <Button 
                    positive icon='random'
                    labelPosition='right' 
                    content='Shuffling' 
                    loading={loadingGame}
                />
            </Modal.Actions>
            )
        default: 
        return (
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
        )
    }
}


export default GameModalActions;