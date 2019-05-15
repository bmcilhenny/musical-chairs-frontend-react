import React, {Fragment} from 'react';
import {Transition, Modal, Container, Image, Icon, Header, Button} from 'semantic-ui-react';
import DropdownWithOptions from '../DropdownWithOptions';

const ShuffleGameModal = ({playlist, numPlayerOptions, shuffleCountdown, deviceOptions, numPlayers, selectedDevice, handleClose, animation}) => {
    
    return (
        <Fragment>
            <Modal.Header >
                <Transition animation='bounce' duration={900} visible={true} >
                    <Header textAlign='center' as='h1'>
                        {shuffleCountdown}
                    </Header>
                </Transition>
            </Modal.Header>
            <Modal.Content>
                <Container textAlign='center' >
                  <Transition animation='shake' duration={6000} visible={animation}>
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