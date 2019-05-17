import React, { Component, Fragment } from 'react';
import Proptypes from 'prop-types';
import { Image, Header, Divider, Container, Grid, Segment, List } from 'semantic-ui-react';
import Loading from '../loading/Loading';
import PlaylistCounter from '../playlist/PlaylistCounter';
import PlaylistFilter from '../playlist/PlaylistFilter';
import GameModalContainer from '../game_modal/GameModalContainer';
import HomeNavbar from '../navbars/HomeNavbar';
import ErrorMessage from '../errors/ErrorMessage';
import * as Util from '../../util/Spotify';
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
    this.props.spotify.getMyDevices().then(devices => this.setState({ devices: devices.devices })).catch(this.handleSpotifyDataError);
  };

  getLastTrack = () => {
    this.props.spotify.getMyCurrentPlayingTrack().then(lastTrack => this.setState({ lastTrack })).catch(this.handleSpotifyDataError);
  };

  handleSpotifyDataError = error => {
    if (error.response && JSON.parse(error.response).error.status === 401) {
      this.handleLogout();
    } else {
      this.setState({ error })
    }
  }

  makeInitialFetch = (spotify) => {
    return Promise.all([
      this.props.spotify.getMe(),
      Util.getPaginatedPlaylists(spotify, []),
      this.props.spotify.getMyDevices(),
      this.props.spotify.getMyCurrentPlayingTrack()
    ])
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
              : <Grid container stackable verticalAlign='middle'>
                <Grid.Row style={{ marginBottom: '2em' }}>
                  <Grid.Column textAlign='center'>
                    <Header as='h1' style={{ fontSize: '4em', color: 'white' }}>
                      How to Play
                    </Header>
                  </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                  <Grid.Column width={8}>
                    <Header as='h3' style={{ fontSize: '2em', color: 'white' }}>
                      What you'll need
                </Header>
                    <List divided verticalAlign='middle' inverted style={{ fontSize: '1.33em' }}>
                      <List.Item>
                        <List.Content>
                          <List.Header >Friends</List.Header><span>Best played with a minimum of 3 people.</span>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header >Beverages</List.Header><span>Lots is preferred. Water to adult beverages.</span>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header >Solo Cups</List.Header><span>The red ones are good.</span>
                        </List.Content>
                      </List.Item>
                      <List.Item>
                        <List.Content>
                          <List.Header >A Spotify-enabled device</List.Header><span>Make sure the device has Spotify opened and if it's a phone, make sure it doesn't lock itself.</span>
                        </List.Content>
                      </List.Item>

                    </List>
                    <Header as='h3' style={{ fontSize: '2em', color: 'white' }}>
                      How to Play
                </Header>
                    <p style={{ fontSize: '1.33em' }}>
                      However many players will be playing, place that many solo cups around the table. Then pour about a 1/5 of your drink of choice into each cup. Choose your playlist, your players, your device (make sure spotify is open on either your laptop or phone at all times, otherwise those devices won't appear in the set up game screen), and begin round. Users walk (read dance) around the table till the music stops, then it's flip cup time. The last person to flip their cup is out. Remove that cup from the table. Refill, then play the another round until one guzzler remains standing. Rinse. Repeat. Enjoy.
                </p>
                  </Grid.Column>
                  <Grid.Column floated='right' width={6}>
                    <Image bordered rounded size='large' src='https://images.pexels.com/photos/761963/pexels-photo-761963.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260' />
                  </Grid.Column>
                </Grid.Row>
              </Grid>}

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