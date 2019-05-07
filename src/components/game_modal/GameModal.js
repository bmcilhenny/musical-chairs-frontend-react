import React, { Component } from 'react';
import { Label, Transition, Modal, Image, Header, Container } from 'semantic-ui-react';
import { times } from 'lodash';
import PlaylistCard from '../playlist/PlaylistCard';
import * as Helper from '../../helpers';
import GameModalActions from './GameModalActions';
import GameModalDropdowns from './GameModalDropdowns';
import {NAH_NAH_NAH_NAH_URI} from '../../constants';

class GameModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            loadingGame: false,
            duration: 6000,
            shuffleCountdown: '',
            shuffleCountdownInterval: '',
            roundCountdown: '',
            roundCountdownInterval: '',
            modalMessage: 'Set up your game',
            shuffleAnimation: true,
            playing: false,
            gameStatus: null,
            roundsLeft: undefined,
            error: '',
            resuming: false,
            timeouts: []
        }
    }

    defaultState = () => ({
        modalOpen: false,
        loadingGame: false,
        duration: 6000,
        shuffleCountdown: '',
        shuffleCountdownInterval: '',
        roundCountdown: '',
        roundCountdownInterval: '',
        modalMessage: 'Set up your game',
        shuffleAnimation: true,
        playing: false,
        gameStatus: null,
        roundsLeft: undefined,
        error: '',
        resuming: false,
        timeouts: []
    })

    componentWillUnmount() {
      clearInterval(this.state.shuffleCountdownInterval);
      clearInterval(this.state.roundCountdownInterval);
    }

    clearAllTimeouts = () => {
      this.state.timeouts.forEach(timeout => clearTimeout(timeout))
    }
    
    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
      this.clearAllTimeouts();
      clearInterval(this.state.shuffleCountdownInterval);
      clearInterval(this.state.roundCountdownInterval);
      this.setState(this.defaultState());
    }

    setShuffleState = () => {
      this.setState({
        shuffleAnimation: !this.state.shuffleAnimation,
        modalMessage:  'Shuffling...',
        playing: false,
        gameStatus: 'shuffle',
        loadingGame: true
      })
    }

    setCountdown = (countdownType, initialVal) => {
      let countdownInterval = setInterval(() => this.tick(countdownType, initialVal), 1000);
      this.setState({
        [countdownType]: initialVal,
        [`${countdownType}Interval`]: countdownInterval
      })
    }

    tick = (countdownType, initialVal) => {
      const countdown = this.state[countdownType];
      const countdownInterval = this.state[`${countdownType}Interval`];
      if (countdown === 0 && countdownType === 'roundCountdown') {
        clearInterval(countdownInterval);
        this.handlePause(true);
      } else if (countdown === 0) {
        clearInterval(countdownInterval)
      } else {
        this.setState({
          [countdownType]: (countdown - 1)
        })
      }
    }

    setPlayState = (currentTrack, artistsNames) => {
      this.setState({
        modalMessage: `Now playing "${currentTrack.item.name}" by ${artistsNames}`,
        loadingGame: false,
        playing: true,
        shuffleCountdown: 'GO!',
        gameStatus: 'play'
      })
    }

    handleSpotifyPlaybackError = (error, modalMessage) => {
      let parsedError = JSON.parse(error.response).error;
      if (parsedError.status === 401) {
        this.handleErrorState('Your Spotify token has expired. Refresh the page.');
      } else if (parsedError.status === 404) {
        this.handleErrorState(`${parsedError.message}! Make sure your device stays open for the duration of the game.`);
      }
        else {
          this.handleErrorState(modalMessage);
        }
    }

    handleErrorState = (modalMessage) => {
      this.setState({
          loadingGame: false,
          modalMessage: modalMessage,
          playing: false 
      })
    }

    handleShuffleResponse = (err, resp) => {
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an error shuffling, try again')
      } else {
        if (this.state.resuming) {
          this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse)
        } else {
          this.setShuffleState();
          this.setCountdown('shuffleCountdown', 5);
          let playTunesTimeout = setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handlePlayResponse), 6000);
          this.setState(prevState => ({
            timeouts: [...prevState.timeouts, playTunesTimeout]
          }))
        }
      }
    }

    handleGetCurrentPlaybackResponse = (err, currentTrack) => {
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an error getting your playback, try again');
      } else {
        const artists = currentTrack.item.artists;
        const artistsNames = artists.reduce((string, artist, i ) => {
          return string += artist.name + ((artists.length !== 1) && ((artists.length - 1) !== i) ? ', ' : '')
        }, '');
        this.setPlayState(currentTrack, artistsNames);
        this.setCountdown('roundCountdown', this.state.resuming ? this.state.roundCountdown : Helper.genRandomNumber(50, 10))
        this.setState({
          resuming: false
        })
      }
    }

    handlePlayResponse = async (err, success) => {
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an unforseen error playing your chune. Close this modal and try again.');
      } else {
        await Helper.sleep(1000);
        this.props.spotify.getMyCurrentPlayingTrack({device_id: this.props.selectedDevice}, this.handleGetCurrentPlaybackResponse);
      }
    }

    numPlayerOptions = () => times(13, (i) => ({ key: i + 3, text: `${i + 3} guzzlers`, value: i + 3  }))
    deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))


    handleNextRoundResponse = (err, success) => {
      if (err) {
        this.handleSpotifyPlaybackError(err, 'There was an error setting up the next round, close this modal and try again.')
      } else {
        let startRoundTimeout = setTimeout(this.startRound, 11000);
        this.setState(prevState => ({
          timeouts: [...prevState.timeouts, startRoundTimeout]
        }))
      }
    }

    startRound = () => {
      clearInterval(this.state.shuffleCountdownInterval)
      clearInterval(this.state.roundCountdownInterval)
      let roundsLeft = this.props.numPlayers - 1;
      if ((this.state.roundsLeft - 1) === 0) {
        this.setState({
          gameStatus: 'gameOver',
          modalMessage: 'Cheers to the guzzler!',
          roundsLeft: undefined,
          shuffleCountdown: 'GAME OVER'
        })
      } else {
        if (this.state.roundsLeft === undefined) {
          this.setState({
            roundsLeft
          })
        } else {
          this.setState(prevState => ({
            roundsLeft: prevState.roundsLeft - 1
          }))
        }
        this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffleResponse)
      } 
    }
  
    handleSkip = () => {
      clearInterval(this.state.roundCountdownInterval);
      this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri}, this.handleShuffleResponse) 
    }

    handleResume = () => {
      this.setState(({
        gameStatus: 'async',
        resuming: true
      }), () => this.props.spotify.play({device_id: this.props.selectedDevice}, this.handlePlayResponse))            
    }

    // refactor this to not use async, await, will have to right yet another callback to handle spotify.pause()
    handlePause = async (shouldDrink) => {
      // set gameStatus to async so users can't mash on play/pause button and send off requests
      await this.setState(prevState => ({
        gameStatus: 'async'
      }))
      await this.props.spotify.pause().catch(() => this.handleErrorState('There was an error pausing, try again')).then(resp => {
        clearInterval(this.state.roundCountdownInterval)
        if (shouldDrink) {
          let playNahNahTimeout = setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, uris: [NAH_NAH_NAH_NAH_URI]}, this.handleNextRoundResponse), 15000);
          this.setState(prevState => ({
              gameStatus: 'drink',
              shuffleCountdown: 'DRINK',
              timeouts: [...prevState.timeouts, playNahNahTimeout]
          }));
        } else {
          this.setState({
            gameStatus: 'paused',
            shuffleCountdown: ''
        });
        }
      });
    } 
  
    render() {
      const {playlist, index, handlePlayersChange, handleDeviceChange, numPlayers, selectedDevice} = this.props;
      const { modalOpen, modalMessage, gameStatus, loadingGame, roundsLeft, shuffleCountdown, duration, shuffleAnimation, playing} = this.state;
      return (
        <Modal 
          size='tiny'
          open={modalOpen}
          onClose={this.handleClose}
          trigger={<PlaylistCard
                      handleOpen={this.handleOpen}      
                      key={`${playlist.name}_${index}`} 
                      playlist={playlist} 
                    />} 
        >
          <Modal.Header as='h2'>{modalMessage}</Modal.Header>
          {shuffleCountdown ? <Label circular color='green' size='massive' floating>{shuffleCountdown}</Label> : null}
          <Modal.Content>
            <Container textAlign='center'>
              <Transition animation='shake' duration={duration} visible={shuffleAnimation}>
                <Image 
                  centered 
                  size='small' 
                  src={playlist.imageUrl} 
                  label={playing ? { as: 'a', color: 'green', corner: 'left', icon: 'music' } : null}
                />
              </Transition>
              <Header as='h3'>
                <Header.Content>
                  {playlist.name}
                  <Header.Subheader>Your selected Playlist</Header.Subheader>
                </Header.Content>
              </Header>
              <GameModalDropdowns
                gameStatus={gameStatus}
                numPlayers={numPlayers}
                roundsLeft={roundsLeft}
                numPlayerOptions={this.numPlayerOptions()} 
                deviceOptions={this.deviceOptions()}
                handlePlayersChange={handlePlayersChange}
                selectedDevice={selectedDevice}
                handleDeviceChange={handleDeviceChange}
              />
            </Container>
          </Modal.Content>
          <GameModalActions
            gameStatus={gameStatus} 
            numPlayers={numPlayers}
            selectedDevice={selectedDevice}
            loadingGame={loadingGame}
            handleClose={this.handleClose}
            handleSkip={this.handleSkip}
            handlePause={this.handlePause}
            startRound={this.startRound}
            handleResume={this.handleResume}
          />
        </Modal>
      )
    }
  }

  export default GameModal;