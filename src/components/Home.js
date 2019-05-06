import React, {Component, Fragment} from 'react';
import { Image, Header, Divider, Container, Grid, Segment  } from 'semantic-ui-react';
import Loading from './loading/Loading';
import PlaylistCounter from './PlaylistCounter';
import PlaylistFilter from './PlaylistFilter';
import GameModal from './GameModal';
import MainNavbar from './navbars/MainNavbar';
import ErrorMessage from './ErrorMessage';
import * as Util from '../util/Spotify';
import * as Helper from '../helpers';
import withAuth from './hocs/withAuth';

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
       error: ''
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
        this.setState({user, playlists, devices}) 
       })
       .catch(this.handleInitialFetchSpotifyDataErrors)
      
       setInterval(() => this.getDevices(), 5000);
    }, 1000)
  }
  
  getDevices = async () => {
    const { devices } = await this.props.spotify.getMyDevices();
    this.setState({ devices });
  };

  handleInitialFetchSpotifyDataErrors = (error) => {
    this.setState({
      error: error
    })
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
        randomPlaylist: Helper.genRandomNumber((this.state.playlists.length - 1), 0)
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
            {user.display_name ? 
                <Fragment>
                  {this.renderErrorMessage()}
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