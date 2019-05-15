import React, { Component, Fragment } from 'react';
import { Transition, Modal, Label, Container, Image, Icon, Header, Button, Placeholder } from 'semantic-ui-react';
import { cleanArtistNames } from '../../../util/DataCleaner';
import { setTimeout } from 'timers';

class DanceBeforeGameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            imageLoaded: false
        }
    }

    toggle = (property) => {
        setTimeout(() => this.setState(prevState => ({ [property]: !prevState[property] })), 1000)
    }

    render() {
        const imageLoaded = this.state.imageLoaded;
        console.log('IMAGE LOADED?', imageLoaded);
        const { playlist, roundsLeft, handlePause, currentTrack, handleSkip, numPlayers, selectedDevice, handleClose, loadingGame } = this.props;
        const roundsRemaining = roundsLeft === 1 ? <Label size='large' color='red'>The Last Round</Label> : (
            <Fragment>
                <Label circular color='green'>{roundsLeft}</Label>
                <span>rounds remaining</span>
            </Fragment>
        )
        return (
            <Fragment>
                <Modal.Header>
                    <Header as='h1' textAlign='center'>
                        <Header.Content>
                            {currentTrack.item.name}
                            <Header.Subheader>by {cleanArtistNames(currentTrack)}</Header.Subheader>
                        </Header.Content>
                    </Header>
                </Modal.Header>
                <Modal.Content>
                    <Container textAlign='center'>
                    
                        { this.state.imageLoaded ? null :
                            (<Placeholder style={{ height: 150, width: 150, margin: 'auto'}}>
                                <Placeholder.Image />
                            </Placeholder>)
                        }
                        <div style={this.state.imageLoaded ? {} : {display: 'none'}}>
                            {/* <Transition animation='swing up' duration={1000} visible={this.state.imageLoaded}> */}
                                <Image
                                    src={currentTrack.item.album.images[1].url}
                                    onLoad={() => {this.toggle('imageLoaded')}}
                                    centered
                                    size='small'
                                    label={{ as: 'a', color: 'green', corner: 'left', icon: 'play' }}
                                />
                            {/* </Transition> */}
                        </div>
                        <Header as='h3'>
                            <Header.Content>
                                {playlist.name}
                                <Header.Subheader>Your selected Playlist</Header.Subheader>
                            </Header.Content>
                        </Header>
                        {roundsRemaining}
                    </Container>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleClose}>Cancel</Button>
                    <Button icon='pause' content=' Pause' onClick={() => handlePause(false)} />
                    <Button positive icon labelPosition='right' disabled={numPlayers && selectedDevice ? false : true} onClick={handleSkip} loading={loadingGame}>
                        Skip
                <Icon name='angle double right' />
                    </Button>
                </Modal.Actions>
            </Fragment>
        )
    }
}

export default DanceBeforeGameModal;