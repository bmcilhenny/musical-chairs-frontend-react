import React, {Component, Fragment} from 'react';
import { Image, Header, Divider, Container, Grid, Segment  } from 'semantic-ui-react';
import Loading from '../loading/Loading';
import PlaylistCounter from '../playlist/PlaylistCounter';
import PlaylistFilter from '../playlist/PlaylistFilter';
import GameModal from '../game_modal/GameModal';
import MainNavbar from '../navbars/MainNavbar';
import ErrorMessage from './ErrorMessage';
import * as Util from '../../util/Spotify';
import {genRandomNumber} from '../../helpers';
import withAuth from '../hocs/withAuth';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       user: {},
       playlists: [],
       randomPlaylist: '',
       filterString: '',
       numPlayers: '',
       devices: [],
       selectedDevice: '',
       loading: false,
       error: '',
       getDevicesIntervalID: ''
    }
    this.randomPlaylist = React.createRef();
  }

  handleLogout = () => {
    localStorage.clear();
    this.props.history.push('/login')
  }

  componentDidMount() {
    setTimeout(() => {
      this.makeInitialFetch(this.props.spotify)
       .then(resp => {
        const [user, playlists, {devices}] = resp;
        const getDevicesIntervalID = setInterval(() => this.getDevices(), 5000);
        this.setState({user, playlists, devices, getDevicesIntervalID});
        if (playlists.length === 0) {
          throw new Error("You have no playlists. Create a playlist on your Spotify account to play.");
        }
        localStorage.setItem('user', JSON.stringify(user));
       })
       .catch(this.handleSpotifyError)
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.state.getDevicesIntervalID)
  }
  
  getDevices = () => {
    this.props.spotify.getMyDevices().then(devices => this.setState({devices: devices.devices})).catch(this.handleSpotifyError);
  };

  handleSpotifyError = error => {
    if (JSON.parse(error.response).error.status === 401) {
      Util.setUpSpotifyAuthorization();
    } else {
      this.setState({error})
    }
  }

  makeInitialFetch = (spotify) => {
    return Promise.all([
      this.props.spotify.getMe(), 
      Util.getPaginatedPlaylists(spotify, []), 
      this.props.spotify.getMyDevices()
   ])
  }

  renderErrorMessage() {
      if (this.state.error) {
        return <ErrorMessage error={this.state.error}/>
      }
  }

   handleDeviceChange = (_, {value}) => {
     this.setState({
      selectedDevice: value 
     })
   }
   
   handlePlayersChange = (_, {value}) => {
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
     const {user, playlists, devices, filterString, selectedDevice, numPlayers, randomPlaylist } = this.state;
     const { spotify } = this.props;
      let playlistsToRender = user && 
      playlists &&
      devices ? 
        playlists.filter(playlist => 
         playlist.name.toLowerCase().includes(filterString.toLowerCase())) : [];
      return (
        <Segment inverted>
            <MainNavbar handleRandomize={this.handleRandomize} handleLogout={this.handleLogout} loading={!(!!playlists.length)}/>
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
                      handleChange={e => this.setState({filterString: e.target.value})} 
                      filterString={filterString} 
                    />
                  </Container>
                  <Divider />
                  <Divider hidden/>
                  <Divider hidden/>
                    <Grid doubling columns={6} style={{width: '90%'}} container>       
                        {playlistsToRender.map((playlist, i) =>
                          <Grid.Column key={`${playlist.name}_${i}xx`} >
                            <GameModal
                              ref={i === randomPlaylist ? this.randomPlaylist : null} 
                              spotify={spotify}
                              playlist={playlist} 
                              devices={devices}  
                              handleDeviceChange={this.handleDeviceChange}
                              handlePlayersChange={this.handlePlayersChange}
                              selectedDevice={selectedDevice}
                              numPlayers={numPlayers}
                            />
                          </Grid.Column> 
                        )}
                    </Grid>
                  <br />
                  <Divider />
                  <br />
                  <br />
                </Fragment>
                : <Loading/>
            }
        </Segment>
      )
   }
}

export default withAuth(Home );