import React from 'react';
import {Modal, Button, Icon} from 'semantic-ui-react';

const GameModalActions = ({gameStatus, numPlayers, selectedDevice, loadingGame, handlePause, handleClose, handleSkip, handleStartGameClick}) => {
    switch (gameStatus) {
        case 'play':
            return (
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon onClick={() => handlePause(false)}>
                <Icon name='pause' />
                Pause
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
        
        case 'paused': 
        return (
            <Modal.Actions>
            <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon >
                <Icon name='play' />
                Play
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
        case 'gameOver':
            return (
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button 
                positive icon='question' 
                labelPosition='right' 
                content='Play Again' 
                disabled={numPlayers && selectedDevice ? false : true}
                onClick={handleStartGameClick}
                loading={loadingGame}
                />
            </Modal.Actions>
            )
        default: 
        return (
            <Modal.Actions>
            <Button negative onClick={handleClose}>Cancel</Button>
            <Button 
                positive icon='checkmark' 
                labelPosition='right' 
                content='Start Game' 
                disabled={numPlayers && selectedDevice ? false : true}
                onClick={handleStartGameClick}
                loading={loadingGame}
            />
            </Modal.Actions>
        )
    }
}


export default GameModalActions;