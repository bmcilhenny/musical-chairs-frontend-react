import React, {Fragment} from 'react';
import {Transition, Modal, Container, Label, Image, Icon, Header, Button} from 'semantic-ui-react';
import DropdownWithOptions from '../DropdownWithOptions';

const ShuffleGameModal = ({playlist, numPlayerOptions, action, shuffleCountdown, deviceOptions, numPlayers, selectedDevice, handleClose, animation}) => {
    return (
        <Fragment>
            <Transition animation='jiggle' duration={1000} visible={animation} >
                <Modal.Header as='h2'>
                    {shuffleCountdown}
                </Modal.Header>
            </Transition>
            <Modal.Content>
                <Container textAlign='center' verticalAlign='center' >
                  <Transition animation='shake' duration={6000} visible={action}>
                    <Image 
                        centered 
                        size='small' 
                        src={playlist.imageUrl} 
                    />
                  </Transition>
                  <Header as='h3'>
                      <Header.Content>
                          {playlist.name}
                          <Header.Subheader>Shuffling Your Selected Playlist</Header.Subheader>
                      </Header.Content>
                  </Header>
                  <DropdownWithOptions
                    disabled={true} 
                    options={numPlayerOptions} 
                    placeholder='How many guzzlers will be guzzling this eve?'
                    value={numPlayers}
                  />
                  <DropdownWithOptions
                      disabled={true} 
                      options={deviceOptions} 
                      placeholder='Select which device to stream music from..'
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
                    positive icon='random'
                    labelPosition='right' 
                    content='Shuffling' 
                    loading={true}
                />
            </Modal.Actions>
        </Fragment>
    )
}

export default ShuffleGameModal;