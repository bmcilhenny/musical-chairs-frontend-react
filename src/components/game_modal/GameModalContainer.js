import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { times } from 'lodash';
import PlaylistCard from '../playlist/PlaylistCard';
import BaseGameModal from './BaseGameModal';
import * as Helper from '../../helpers';
import {NAH_NAH_NAH_NAH_URI} from '../../constants';

class GameModalContainer extends Component {

  static propTypes = {
    spotify: Proptypes.object.isRequired,
    devices: Proptypes.array.isRequired,
    playlist: Proptypes.object.isRequired,
    handlePlayersChange: Proptypes.func.isRequired,
    handleDeviceChange: Proptypes.func.isRequired,
    selectedDevice: Proptypes.string.isRequired,
    numPlayers: Proptypes.number.isRequired
  };

  constructor(props) {
      super(props)
      this.state = {
          modalOpen: false,
          shuffleCountdown: '',
          shuffleCountdownInterval: '',
          roundCountdown: '',
          roundCountdownInterval: '',
          gameStatus: 'before',
          roundsLeft: undefined,
          resuming: false,
          error: {},
          timeouts: [],
          lastTrack: {},
          currentTrack: {},
          animation: false,
          shuffleAnimation: true,
          shuffleAnimationInterval: '',
          imageLoaded: false
      }
  }

    defaultState = () => ({
        modalOpen: false,
        shuffleCountdown: '',
        shuffleCountdownInterval: '',
        roundCountdown: '',
        roundCountdownInterval: '',
        gameStatus: 'before',
        roundsLeft: undefined,
        resuming: false,
        error: {},
        timeouts: [],
        lastTrack: {},
        currentTrack: {},
        animation: false,
        shuffleAnimation: true,
        shuffleAnimationInterval: '',
        imageLoaded: false
    })

    componentWillUnmount() {
      this.clearCountdownIntervals();
    }
    
    handleOpen = async () => {
      await this.setState({ modalOpen: true})
      await this.setState(prevState => ({animation: !prevState.animation}))
    }

    clearCountdownIntervals = () => {
      clearInterval(this.state.shuffleCountdownInterval);
      clearInterval(this.state.roundCountdownInterval);
    }

    setImageLoaded = () => {
      this.setState({
        imageLoaded: true
      })
    }

    handleClose = () => {
      this.clearAllTimeouts();
      this.clearCountdownIntervals();
      this.setState(this.defaultState());
    }

    numPlayerOptions = () => times(13, (i) => ({ key: i + 3, text: `${i + 3} guzzlers`, value: i + 3  }))
    deviceOptions = () => this.props.devices.map(device => ({ key: device.name, text: device.name, value: device.id }))

    tick = (countdownType) => {
      const countdown = this.state[countdownType];
      const countdownInterval = this.state[`${countdownType}Interval`];
      if (countdown === 0 && countdownType === 'roundCountdown') {
        clearInterval(countdownInterval);
        this.handlePause(true);
      } else if (countdown === 0) {
        clearInterval(countdownInterval)
        clearInterval(this.state.shuffleAnimationInterval);
      } else {
        this.setState(prevState => ({
          [countdownType]: (countdown - 1)
        }))
      }
    }

    clearAllTimeouts = () => {
      this.state.timeouts.forEach(timeout => clearTimeout(timeout))
    }

    handleSpotifyPlaybackError = (error, modalMessage) => {
      if (error.response) {
        const parsedError = JSON.parse(error.response).error;
        if (parsedError.status === 401) {
          this.setState({error: new Error(`${parsedError.message}! Your Spotify token has expired. Refresh the page.`)});
        } else if (parsedError.status === 404) {
          this.setState({error: new Error(`${parsedError.message}! Make sure your device stays open for the duration of the game.`)});
        }  else if (parsedError.status === 429) {
            this.setState({error: new Error(`${parsedError.message}! Unfortunately Spotify limits the number of API calls, wait a few seconds and try again.`)});
        } else {
            this.setState({error: new Error(modalMessage)});
          }
      } else {
        this.setState({error: new Error(modalMessage)})
      }
    }
 
    handleShuffle = (resp) => {
      const shuffleCountdownInterval = setInterval(() => this.tick('shuffleCountdown'), 1000);
      this.setState({
        gameStatus: 'shuffle',
        shuffleCountdown: 5,
        shuffleCountdownInterval: shuffleCountdownInterval
      }, () => {
        this.setState(prevState => ({shuffleAnimation: !prevState.shuffleAnimation, animation: !prevState.animation}));
        const playTunesTimeout = setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
          .then(this.handlePlayResponse)
          .catch(err => this.handleSpotifyPlaybackError(err, 'There was an unforseen error playing your chune. Close this modal and try again.')), 6000);
        this.setState(prevState => ({
          timeouts: [...prevState.timeouts, playTunesTimeout]
        }))
      });
    }

    handlePlayResponse = () => {
      const {lastTrack, selectedDevice } = this.props;
      const {resuming, currentTrack } = this.state;
      if (resuming) {
        const roundCountdownInterval = setInterval(() => this.tick('roundCountdown'), 1000);
        this.setState({
          gameStatus: 'dance',
          roundCountdownInterval: roundCountdownInterval,
          resuming: false
        })
      }
      else if (lastTrack && lastTrack.item && currentTrack.item && lastTrack.item.uri !== currentTrack.item.uri) {
        debugger;
          const roundCountdownInterval = setInterval(() => this.tick('roundCountdown'), 1000);
          this.setState({
            gameStatus: 'dance',
            roundCountdown: Helper.genRandomNumber(20, 10),
            roundCountdownInterval: roundCountdownInterval,
            resuming: false,
            imageLoaded: false
          })  
      }  else {
          this.props.spotify.getMyCurrentPlayingTrack({device_id: selectedDevice}).then(currentTrack => {
            if (currentTrack.item.uri !== lastTrack.item.uri) {
              const roundCountdownInterval = setInterval(() => this.tick('roundCountdown'), 1000);
              this.setState({
                gameStatus: 'dance',
                currentTrack: currentTrack,
                roundCountdown: Helper.genRandomNumber(50, 10),
                roundCountdownInterval: roundCountdownInterval,
                imageLoaded: false
              })
            } else {
              this.handlePlayResponse()
            }
          }).catch(this.handleSpotifyDataError);
      }
    }

    handleSpotifyDataError = error => {
      if (error.response) {
        const parsedError = JSON.parse(error.response).error;
        if (parsedError.status === 401) {
          this.props.handleLogout();
        } else if (parsedError.status === 429) {
          this.setState({error: new Error(`${parsedError.message}! Unfortunately Spotify limits the number of API calls, wait a few seconds and try again.`)}); 
        } else {
          this.setState({error})
        }
      } else {
        this.setState({error})
      }
    } 

    handleNextRoundResponse = (resp) => {
      const startRoundTimeout = setTimeout(this.startRound, 11000);
      this.setState(prevState => {
        return ({
          timeouts: [...prevState.timeouts, startRoundTimeout],
          currentTrack: {},
          lastTrack: prevState.currentTrack
        }) 
      })
    }

    startRound = async () => {
      this.clearCountdownIntervals();
      const roundsLeft = this.props.numPlayers - 1;
      if ((this.state.roundsLeft - 1) === 0) {
        this.setState({
          gameStatus: 'gameOver',
          roundsLeft: undefined
        })
      } else {
        await this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
        .then(this.handleShuffle)
        .catch((error) => this.handleSpotifyPlaybackError(error, 'There was an error shuffling, try again')) 
        if (this.state.roundsLeft === undefined) {
          this.setState({roundsLeft})
        } else {
          this.setState(prevState => ({roundsLeft: prevState.roundsLeft - 1}))
        }
      } 
    }
  
    handleSkip = () => {
      this.clearCountdownIntervals();
      this.props.spotify.setShuffle(true, {device_id: this.props.selectedDevice, context_uri: this.props.playlist.uri})
      .then(this.handleShuffle)
      .catch((error) => this.handleSpotifyPlaybackError(error, 'There was an error shuffling, try again')) 
    }

    handleResume = () => {
      this.setState({resuming: true}, () => this.props.spotify.play({device_id: this.props.selectedDevice})
        .then(this.handlePlayResponse)
        .catch(err => this.handleSpotifyPlaybackError(err, 'There was an unforseen error playing your chune. Close this modal and try again.')))            
    }

    handlePause = (shouldDrink) => {
      this.props.spotify.pause().catch((error) => this.handleSpotifyPlaybackError(error, 'There was an error pausing, try again')).then(resp => {
        clearInterval(this.state.roundCountdownInterval)
        if (shouldDrink) {
          this.setState(prevState => ({
              gameStatus: 'drink',
              animation: !prevState.animation,
              timeouts: [...prevState.timeouts, playNahNahTimeout]
          }));
          const playNahNahTimeout = setTimeout(() => this.props.spotify.play({device_id: this.props.selectedDevice, uris: [NAH_NAH_NAH_NAH_URI]})
          .then(this.handleNextRoundResponse)
          .catch(err => this.handleSpotifyPlaybackError(err, 'There was an error setting up the next round, close this modal and try again.')), 15000);
        } else {
          this.setState({gameStatus: 'paused'});
        }
      });
    } 
  
    render() {
      const { playlist, index} = this.props;
      const { modalOpen, gameStatus} = this.state;
      const numPlayerOptions = this.numPlayerOptions();
      const deviceOptions = this.deviceOptions();
      // console.log('GAME STATUS', gameStatus);
      return (
        <Modal size='tiny'open={modalOpen}onClose={this.handleClose} trigger={<PlaylistCard handleOpen={this.handleOpen} key={`${playlist.name}-${index}`} playlist={playlist} />}>
          <BaseGameModal 
            gameStatus={gameStatus}
            handleOpen={this.handleOpen}
            handleClose={this.handleClose}
            numPlayerOptions={numPlayerOptions}
            deviceOptions={deviceOptions} 
            handlePause={this.handlePause}
            handleSkip={this.handleSkip}
            handleResume={this.handleResume}
            startRound={this.startRound}
            setImageLoaded={this.setImageLoaded}
            {...this.props} 
            {...this.state} />
        </Modal>
      )
    }
  }

  export default GameModalContainer;
