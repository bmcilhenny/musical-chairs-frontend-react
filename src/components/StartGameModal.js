import React, { Component, Fragment } from 'react';
import { Label, Transition, Modal, Button, Icon, Image, Header, Container } from 'semantic-ui-react';
import { times } from 'lodash';
import DropdownWithOptions from './DropdownWithOptions';
import PlaylistCard from './PlaylistCard';
import * as Helper from '../helpers'

class StartGameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            loadingGame: false,
            duration: 6000,
            countdown: '',
            modalMessage: 'Set up your game',
            shuffleAnimation: true,
            playing: false,
            gameStatus: null,
            counterInterval: '',
            roundsLeft: props.numPlayers,
            error: '',
            max: 50,
            min: 15
        }
    }

    defaultState = () => ({
        modalOpen: false,
        loadingGame: false,
        duration: 6000,
        countdown: '',
        modalMessage: 'Set up your game',
        shuffleAnimation: true,
        playing: false,
        gameStatus: null,
        counterInterval: '',
        roundsLeft: this.props.numPlayers,
        error: '',
        max: 50,
        min: 15
    })
    
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        clearInterval(this.state.counterInterval);
        this.setState(this.defaultState())
    }

    numPlayerOptions = () => times(15, (i) => ({ key: i, text: `${i + 1} guzzlers`, value: i + 1  }))
    deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

    handleStartGameClick = async () => {
      let totalRounds = this.props.numPlayers;
      if (this.state.counterInterval) {
        clearInterval(this.state.counterInterval)
      }
      this.setState({
        loadingGame: true,
        playing: false,
        countdown: ''
      });
      while (totalRounds > 0) {
        try {
            await this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
            this.startCountDown();
              this.setState({
                shuffleAnimation: !this.state.shuffleAnimation,
                modalMessage:  'Shuffling...',
                playing: false,
                gameStatus: 'shuffle'
            })
            await Helper.sleep(this.state.duration)
            await this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
            await Helper.sleep(1500)
            let currentTrack = await this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice})
            const artists = currentTrack.item.artists;
            const artistsNames = artists.reduce((string, artist, i ) => {
              return string += artist.name + ((artists.length !== 1) && ((artist.length - 1) !== i) ? ', ' : '')
            }, '')
            this.setState({
              modalMessage: `Now playing "${currentTrack.item.name}" by ${artistsNames}`,
              loadingGame: false,
              playing: true,
              countdown: 'GO!',
              gameStatus: 'play'
            })
            await Helper.sleep(Helper.genRandomNumber(this.state.max, this.state.min))
            await this.handlePause(true)
            await Helper.sleep(15000)
            debugger;
            await this.props.spotify.play({device_id: this.props.selectedDevice, uris: ['spotify:track:1Yp50bPPjK0VIAI2mKK5TG']})
            await Helper.sleep(11000)
            debugger;
            this.setState({
              roundsLeft: this.state.roundsLeft ? this.state.roundsLeft - 1 : this.props.numPlayers - 1
            })
            totalRounds--;
        }
        catch (e) {
          debugger;
          // do stuff with errors
        }
        this.setState({
          gameStatus: 'game over'
        })

      }
    }
  
    handleShuffle = (err, success) => {
      if (err) {
        console.log('Shuffle error', err)
        this.setState({ 
          loadingGame: false,
          modalMessage: 'There was an error, try again',
          playing: false 
        })
      } else {
        this.startCountDown();
        this.setState({
          shuffleAnimation: !this.state.shuffleAnimation,
          modalMessage:  'Shuffling...',
          playing: false,
          gameStatus: 'shuffle'
        })
        setTimeout(() => {
          this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlay);
        }, this.state.duration)
      }
    }
  
    handlePlay = (err, success) => {
      if (err) {
        console.log('ERR', err)
        this.setState({ 
          loadingGame: false,
          gameStatus: 'play',
          modalMessage: 'There was an error, try again'
        })
      } else {
        // generate random amount of secs between 5 and 45 seconds 
        setTimeout(() => {
          this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice})
          // .then(resp => {
          //   const artists = resp.item.artists;
          //   const artistsNames = artists.reduce((string, artist, i ) => {
          //     return string += artist.name + ((artists.length !== 1) && ((artist.length - 1) !== i) ? ', ' : '')
          //   }, '')
          //   this.setState({
          //     modalMessage: `Now playing "${resp.item.name}" by ${artistsNames}`,
          //     loadingGame: false,
          //     playing: true,
          //     countdown: 'GO!',
          //     gameStatus: 'play'
          //   })
          // }).catch(handleShuffleError)
        }, 500);
        // need this timeout because of the async between playing and getting current track
        setTimeout(() => {
          
        })
      }
    }
  
    tick = () => {
      const countdown = this.state.countdown;
    //   console.log('STATE COUNTDOWN', countdown);
      if (countdown === 0) {
        clearInterval(this.state.counterInterval)
      } else {
        this.setState({
          countdown: (countdown - 1)
        })
      }
    }
  
    startCountDown = () => {
      let counterInterval = setInterval(this.tick, 1000);
      this.setState({
        countdown: 5,
        counterInterval: counterInterval
      })
    }
  
    runRound = () => {
      let roundDuration = Helper.genRandomNumber(this.state.max, this.state.min)
      setTimeout(() => {
        this.props.spotify.getMyCurrentPlaybackState().then(resp => {
            if (resp.is_playing) {
                this.handlePause(true);
            }
        });
        this.setState({
            roundsLeft: this.state.roundsLeft - 1
        })
      }, roundDuration)
    }
  
    handleSkip = () => {
        // check to see if song that was playing is different than song that is playing
      console.log('SKIP SONG')
    }

    handlePause = async (shouldDrink) => {
        console.log('SHOULD WE DRINK?', shouldDrink);
        await this.props.spotify.pause().catch((err) => {
            console.log('ERROR PAUSING', err)
        });
        this.setState({
            gameStatus: 'paused',
            countdown: shouldDrink ? 'DRINK' : 'PAUSED'
        });
        let resp = await this.props.spotify.getMyCurrentPlaybackState();
        if (resp.is_playing) {
            await this.handlePause(shouldDrink);
        } 
        // ).catch(err => console.log('ERROR GETTING CURRENT PLAYBACK STATE IN HANDLE PAUSE', err));
    }

    renderDropdowns = (gameStatus) => {
        switch (gameStatus) {
            case 'play':
                return (
                    <Fragment>
                        <Label circular color='green'>{this.state.roundsLeft}</Label>
                        <span>rounds remaining</span>
                    </Fragment>
                )
            case 'play':
            return (
                <Fragment>
                    <span>Game over</span>
                </Fragment>
            )
            case 'shuffle':
            return (
                <Fragment>
                    <DropdownWithOptions
                        disabled={true} 
                        options={this.numPlayerOptions()} 
                        placeholder='How many guzzlers will be guzzling this eve?'
                        value={this.props.numPlayers}
                    />
                    <DropdownWithOptions
                        disabled={true} 
                        options={this.deviceOptions()} 
                        placeholder='Select which device to stream music from'
                        value={this.props.selectedDevice}
                    />
                </Fragment>
            )
            default:
            return (
                <Fragment>
                    <DropdownWithOptions
                        disabled={false} 
                        options={this.numPlayerOptions()} 
                        placeholder='How many guzzlers will be guzzling this eve?'
                        handleChange={this.props.handlePlayersChange}
                        value={this.props.numPlayers}
                    />
                    <DropdownWithOptions 
                        disabled={false}
                        options={this.deviceOptions()} 
                        placeholder='Select which device to stream music from'
                        handleChange={this.props.handleDeviceChange}
                        value={this.props.selectedDevice}
                    />
                </Fragment>
            )
        }
    }
  
  
    render() {
        console.log('NUM PLAYERS', this.props.numPlayers);
        console.log('ROUNDS', this.state.roundsLeft);
      const {playlist, index, selected, devices, handlePlaylistSelect, handlePlayersChange, handleDeviceChange, numPlayers, selectedDevice} = this.props;
      const { gameStatus} = this.state;
      let renderModalActions = () => {
        // console.log('GAME STATUS', this.state.gameStatus)
        switch (gameStatus) {
          case 'play':
            return (
              <Modal.Actions>
                <Button negative onClick={this.handleClose}>Cancel</Button>
                <Button icon onClick={() => this.handlePause(false)}>
                  <Icon name='pause' />
                  Pause
                </Button>
                <Button
                  positive
                  icon 
                  labelPosition='right'
                  disabled={numPlayers && selectedDevice ? false : true}
                  onClick={this.handleSkip}
                  loading={this.state.loadingGame}
                >
                  Skip
                  <Icon name='angle double right' />
                </Button>
              </Modal.Actions>
            )
        
          case 'paused': 
          return (
            <Modal.Actions>
              <Button negative onClick={this.handleClose}>Cancel</Button>
                <Button icon >
                  <Icon name='play' />
                  Play
                </Button>
                <Button 
                    positive
                    icon 
                    labelPosition='right'
                    disabled={numPlayers && selectedDevice ? false : true}
                    onClick={this.handleSkip}
                    loading={this.state.loadingGame}
                >
                  Skip
                  <Icon name='angle double right' />
                </Button>
            </Modal.Actions>
          )
          case 'gameOver':
            return (
              <Modal.Actions>
                <Button negative onClick={this.handleClose}>Cancel</Button>
                <Button 
                  positive icon='question' 
                  labelPosition='right' 
                  content='Play Again' 
                  disabled={numPlayers && selectedDevice ? false : true}
                  onClick={this.handleStartGameClick}
                  loading={this.state.loadingGame}
                />
              </Modal.Actions>
            )
          default: 
          return (
            <Modal.Actions>
              <Button negative onClick={this.handleClose}>Cancel</Button>
              <Button 
                positive icon='checkmark' 
                labelPosition='right' 
                content='Start Game' 
                disabled={numPlayers && selectedDevice ? false : true}
                onClick={this.handleStartGameClick}
                loading={this.state.loadingGame}
              />
            </Modal.Actions>
          )
        }
      }
  
      return (
        <Modal 
          size='mini'
          open={this.state.modalOpen}
          onClose={this.handleClose}
          trigger={<PlaylistCard
                      handleOpen={this.handleOpen}      
                      key={`${playlist.name}_${index}xx`} 
                      playlist={playlist} 
                      selected={selected} 
                      devices={devices}  
                      handlePlaylistSelect={handlePlaylistSelect} 
                      handlePlayersChange={handlePlayersChange}
                      handleDeviceChange={handleDeviceChange}
                      numPlayers={numPlayers} 
                      selectedDevice={selectedDevice}
                    />} 
        >
          <Modal.Header h2>{this.state.modalMessage}</Modal.Header>
          {this.state.countdown ? <Label circular color='green' size='massive' floating>{this.state.countdown}</Label> : null}
          <Modal.Content>
            <Container textAlign='center'>
              <Transition animation='shake' duration={this.state.duration} visible={this.state.shuffleAnimation}>
                <Image 
                  centered 
                  size='small' 
                  src={playlist.imageUrl} 
                  label={this.state.playing ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                />
              </Transition>
              <Header as='h3'>
                <Header.Content>
                  {playlist.name}
                  <Header.Subheader>Your selected Playlist</Header.Subheader>
                </Header.Content>
              </Header>
              {this.renderDropdowns(gameStatus)}
            </Container>
          </Modal.Content>
          {renderModalActions()}
        </Modal>
      )
    }
  }

  export default StartGameModal;