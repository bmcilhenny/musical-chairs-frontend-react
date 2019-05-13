import React, {Fragment} from 'react';
import {Transition, Modal, Container, Icon, Button} from 'semantic-ui-react';

const AsyncGameModal = ({numPlayers, selectedDevice, handleClose}) => {
    return (
        <Fragment>
            <Transition animation='jiggle' duration={1000} visible={true} >
                <Modal.Header as='h1'></Modal.Header>
            </Transition>
            <Modal.Content>
                <Container textAlign='center'>
                    {/* loading */}
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon='pause' content=' Pause' loading={true} />
                <Button disabled={true} positive icon labelPosition='right' disabled={numPlayers && selectedDevice ? false : true} loading={true}>
                    Skip
                    <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
        </Fragment>
    )
}

export default AsyncGameModal;