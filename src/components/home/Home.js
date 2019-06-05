import React, { Component, Fragment } from 'react';
import Proptypes from 'prop-types';
import { Image, Header, Divider, Container, Grid, Segment } from 'semantic-ui-react';
import Loading from '../loading/Loading';
import About from './About';
import PlaylistCounter from '../playlist/PlaylistCounter';
import PlaylistFilter from '../playlist/PlaylistFilter';
import GameModalContainer from '../game_modal/GameModalContainer';
import HomeNavbar from '../navbars/HomeNavbar';
import ErrorMessage from '../errors/ErrorMessage';
import * as Util from '../../util/Spotify';
import { cleanTrackData } from '../../util/DataCleaner';
import { genRandomNumber } from '../../helpers';
import withAuth from '../hocs/withAuth';

class Home extends Component {

  static propTypes = {
    spotify: Proptypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
      user: {},
      playlists: [],
      lastTrack: {},
      randomPlaylist: '',
      filterString: '',
      numPlayers: '',
      devices: [],
      selectedDevice: '',
      loading: false,
      error: {},
      getDevicesIntervalID: ''
    }
    this.randomPlaylist = React.createRef();
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login')
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  makeInitialFetch = (spotify) => {
    return Promise.all([
      this.props.spotify.getMe(),
      Util.getPaginatedPlaylists(spotify, []),
      this.props.spotify.getMyDevices(),
      this.props.spotify.getMyCurrentPlayingTrack()
    ])
  }

  componentDidMount() {
    setTimeout(() => {
      this.makeInitialFetch(this.props.spotify)
        .then(resp => {
          const [user, playlists, { devices }, lastTrack] = resp;
          const getDevicesIntervalID = setInterval(() => this.getDevices(), 5000);
          const getLastTrackIntervalID = setInterval(() => this.getLastTrack(), 10000);
          this.setState({ user, playlists, devices, lastTrack, getDevicesIntervalID, getLastTrackIntervalID });
          if (playlists.length === 0) {
            throw new Error("You have no playlists. Create a playlist on your Spotify account to play.");
          }
          if (devices.length === 0) {
            throw new Error("You have no devices with Spotify open. Keep your devices on and Spotify open for the entirety of the game.");
          }
          localStorage.setItem('user', JSON.stringify(user));
        })
        .catch(this.handleSpotifyDataError)
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.state.getDevicesIntervalID);
    clearInterval(this.state.getLastTrackIntervalID);
  }

  getDevices = () => {
    this.props.spotify.getMyDevices()
    .then(devices => {
      this.setState(prevState => {
        if (JSON.stringify(prevState.devices) === JSON.stringify(devices.devices)) {
          return null;
        } 
        return { devices: devices.devices }
      })
    })
    .catch(this.handleSpotifyDataError);
  };

  getLastTrack = () => {
    this.props.spotify.getMyCurrentPlayingTrack()
    .then(lastTrack => cleanTrackData(lastTrack))
    .then(lastTrack => {
      debugger;
      this.setState(prevState => {
        if (JSON.stringify(prevState.lastTrack) === JSON.stringify(lastTrack)) {
          return null;
        } 
        return { lastTrack };
      })
    })
    .catch(this.handleSpotifyDataError);
  };

  handleSpotifyDataError = error => {
    if (error.response && JSON.parse(error.response).error.status === 401) {
      this.handleLogout();
    } else {
      this.setState({ error })
    }
  }

  renderErrorMessage() {
    if (this.state.error.message) {
      return <ErrorMessage error={this.state.error.message} />
    }
  }

  handleDeviceChange = (_, { value }) => {
    this.setState({
      selectedDevice: value
    })
  }

  handlePlayersChange = (_, { value }) => {
    this.setState({
      numPlayers: value
    })
  }

  handleRandomize = () => {
    this.setState({
      randomPlaylist: genRandomNumber((this.state.playlists.length - 1), 0)
    }, () => this.randomPlaylist.current.handleOpen())
  }

  render() {
    const { activeItem, user, playlists, lastTrack, devices, filterString, selectedDevice, numPlayers, randomPlaylist } = this.state;
    const { spotify } = this.props;
    const playlistsToRender = user &&
      playlists &&
      devices ?
      playlists.filter(playlist =>
        playlist.name.toLowerCase().includes(filterString.toLowerCase())) : [];
    return (
      <Segment inverted>
        <HomeNavbar activeItem={activeItem} handleItemClick={this.handleItemClick} handleRandomize={this.handleRandomize} handleLogout={this.handleLogout} loading={!(!!playlists.length)} />
        {this.renderErrorMessage()}
        {user.display_name ?
          <Fragment>
            <Header as='h2' icon textAlign='center' >
              <Image src={user.images[0].url} size='huge' circular />
              <br />
              <br />
              <Header.Content>{user.display_name}'s Playlists</Header.Content>
            </Header>
            <Container textAlign='center'>
              <PlaylistCounter playlists={playlistsToRender} />
            </Container>
            <br />
            <Container textAlign='center'>
              <PlaylistFilter
                handleChange={e => this.setState({ filterString: e.target.value })}
                filterString={filterString}
              />
            </Container>
            <Divider />
            <Divider hidden />
            <Divider hidden />
            {this.state.activeItem === 'home' ?
              <Grid doubling columns={6} style={{ width: '90%' }} container>
                {playlistsToRender.map((playlist, i) =>
                  <Grid.Column key={`${playlist.name}_${i}xx`} >
                    <GameModalContainer
                      ref={i === randomPlaylist && this.randomPlaylist}
                      spotify={spotify}
                      playlist={playlist}
                      lastTrack={lastTrack}
                      devices={devices}
                      handleDeviceChange={this.handleDeviceChange}
                      handlePlayersChange={this.handlePlayersChange}
                      selectedDevice={selectedDevice}
                      numPlayers={numPlayers}
                    />
                  </Grid.Column>
                )}
              </Grid>
              : <About />}

            <br />
            <Divider />
            <br />
            <br />
          </Fragment>
          : <Loading />
        }
      </Segment>
    )
  }
}

export default withAuth(Home);