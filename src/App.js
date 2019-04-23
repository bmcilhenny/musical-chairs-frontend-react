import React, {Component, Fragment} from 'react';
import { Image, Header, Divider, Container, Grid, Segment } from 'semantic-ui-react';
import Spotify from 'spotify-web-api-js';
import Loading from './components/Loading';
import PlaylistCounter from './components/PlaylistCounter';
import PlaylistFilter from './components/PlaylistFilter';
import GameModal from './components/GameModal';
import Navbar from './components/Navbar';
import ErrorMessage from './components/ErrorMessage';
import * as Util from './util/Spotify';
import * as Helper from './helpers';

const spotify = new Spotify();
Util.setupSpotify(spotify);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
       user: {},
       playlists: [],
       randomPlaylist: '',
       filterString: '',
       selectedPlaylist: '',
       numPlayers: '',
       devices: [],
       selectedDevice: '',
       loading: false,
       error: ''
    }
    this.randomPlaylist = React.createRef();
  }

  componentDidMount() {
    setTimeout(() => {
      this.makeInitialFetch(spotify)
       .then(resp => {
        const [user, playlists, {devices}] = resp;
        this.setState({user, playlists, devices}) 
       })
       .catch(this.handleInitialFetchSpotifyDataErrors)
      
       setInterval(() => this.getDevices(), 5000);
    }, 1000)
  }
  
  getDevices = async () => {
    const { devices } = await spotify.getMyDevices();
    this.setState({ devices });
  };

  handleInitialFetchSpotifyDataErrors = (error) => {
    this.setState({
      error: error
    })
  }

  makeInitialFetch = (spotify) => {
    return Promise.all([
      spotify.getMe(), 
      Util.getPaginatedPlaylists(spotify, []), 
      spotify.getMyDevices()
   ])
  }

    renderErrorMessage() {
      if (this.state.error) {
        return <ErrorMessage error={this.state.error}/>
      }
    }
    
   handlePlaylistSelect = (playlistId) => {
     this.setState({
       selectedPlaylist: playlistId
     })
   }

   handleDeviceChange = (nothing, {value}) => {
     this.setState({
      selectedDevice: value 
     })
   }
   
   handlePlayersChange = (nothing, {value}) => {
    this.setState({
      numPlayers: value
    })
  }

  handleRandomize = async () => {
    if (this.state.playlists.length) {
      await this.setState({
        randomPlaylist: Helper.genRandomNumber((this.state.playlists.length - 1), 0)
      })
      this.randomPlaylist.current.handleOpen();
    }
  }

   render() {
      let playlistsToRender = this.state.user && 
      this.state.playlists &&
      this.state.devices ? 
        this.state.playlists.filter(playlist => 
         playlist.name.toLowerCase().includes(this.state.filterString.toLowerCase())) : [];
      return (
         <Segment inverted>
            {this.state.user.display_name ? 
              <Fragment>
                <Navbar handleRandomize={this.handleRandomize} />
                {this.renderErrorMessage()}
                <Header as='h2' icon textAlign='center' >
                  <Image src={this.state.user.images[0].url} size='huge' circular />
                  <br />
                  <br />
                  <Header.Content>{this.state.user.display_name}'s Playlists</Header.Content>
                </Header>
                <Container textAlign='center'>
                  <PlaylistCounter playlists={playlistsToRender} />
                </Container>
                <br />
                <Container textAlign='center'>
                  <PlaylistFilter 
                    handleChange={e => this.setState({filterString: e.target.value})} 
                    filterString={this.state.filterString} 
                  />
                </Container>
                <Divider />
                <Grid doubling columns={6} style={{width: '80%'}} container>
                  {playlistsToRender.map((playlist, i) => 
                    <GameModal
                      ref={i === this.state.randomPlaylist ? this.randomPlaylist : null} 
                      spotify={spotify}
                      playlist={playlist} 
                      key={`${playlist.name}_${i}xx`}
                      selected={this.state.selectedPlaylist === playlist.id} 
                      handlePlaylistSelect={this.handlePlaylistSelect} 
                      devices={this.state.devices}  
                      handleDeviceChange={this.handleDeviceChange}
                      handlePlayersChange={this.handlePlayersChange}
                      selectedDevice={this.state.selectedDevice}
                      numPlayers={this.state.numPlayers} 
                    />
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