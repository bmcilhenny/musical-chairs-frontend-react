import React, {Fragment} from 'react';
import {Transition, Modal, Container, Icon, Header, Button} from 'semantic-ui-react';
import ErrorMessage from '../../errors/ErrorMessage';

const ErrorGameModal = ({handleClose, error, action}) => {
    
    return (
        <Fragment>
            {/* will need to add styling here to keep same size */}
            <Modal.Header as='h2'></Modal.Header>
            <Modal.Content>
                <Container textAlign='center' verticalAlign='center' >
                    <Transition animation='fly down' duration={1000} visible={action}>
                        <Header as='h1'>
                            <Header.Content>
                                <ErrorMessage error={error} />
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
                    positive
                    icon 
                    labelPosition='right'
                    disabled={true}
                    loading={true}
                >
                Skip
                <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
        </Fragment>
    )
}

export default ErrorGameModal;