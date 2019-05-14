import React, {Fragment} from 'react';
import {Transition, Modal, Container, Icon, Button, Loader} from 'semantic-ui-react';

const AsyncGameModal = ({handleClose}) => {
    debugger;
    return (
        <Fragment>
            <Transition animation='jiggle' duration={1000} visible={true} >
                <Modal.Header as='h1'>Async</Modal.Header>
            </Transition>
            <Modal.Content>
                <Container textAlign='center'>
                    <Loader size='large' active inline='centered'>Loading</Loader>
                </Container>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleClose}>Cancel</Button>
                <Button icon='pause' content=' Pause' loading={true} />
                <Button disabled={true} positive icon labelPosition='right' loading={true}>
                    Skip
                    <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
        </Fragment>
    )
}

export default AsyncGameModal;