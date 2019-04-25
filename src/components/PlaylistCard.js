import React, {Component, Fragment} from 'react';
import { Image, Icon, Reveal, Header, Placeholder} from 'semantic-ui-react';

class PlaylistCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: false,
            underlined: false,
            imageLoaded: false
        }
    }

    toggle = (property) => {
        this.setState(prevState => {
            return ({[property]: !prevState[property]})
        })
    }
    
    render() {
        const {playlist, handleOpen } = this.props;
        return (
            <Fragment>
                { this.state.imageLoaded ? null :
                    <Placeholder inverted >
                        <Placeholder.Image  style={{ height: 150, width: 150}} />
                        <Placeholder.Paragraph>
                        <Placeholder.Line length='very long'/>
                        <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                }
                    <Fragment >
                        <div style={this.state.imageLoaded ? {} : {display: 'none'}}>
                            <Reveal animated='fade' instant onClick={handleOpen} >
                                <Reveal.Content visible >
                                    <div  onMouseEnter={() => this.toggle('size')} onMouseLeave={() => this.toggle('size')} style={{zIndex: '-1', cursor: 'pointer', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid rgba(0, 0, 0, 0)', height: this.state.size ? '50px' : '45px', width: this.state.size ? '50px' : '45px', backgroundColor: 'rgba(0, 0, 0, 0)', borderRadius: '50%'}}></div>
                                    <Image src={playlist.imageUrl} onLoad={() => this.toggle('imageLoaded')} style={{zIndex: '-2'}} />
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                    <Icon  name='beer' size='large' style={{zIndex: '-1', cursor: 'pointer', fontSize: this.state.size ? '1.3em' : '1.0em', position: 'absolute', top: '50%', left: '51%', transform: 'translate(-50%, -50%)'}} />
                                    <div  style={{zIndex: '-2', cursor: 'pointer', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', border: '1px solid white', height: this.state.size ? '50px' : '45px', width: this.state.size ? '50px' : '45px', backgroundColor: 'rgba(0, 0, 0, 0.5)', filter: 'brightness(50%)', borderRadius: '50%'}}></div>
                                    <Image src={playlist.imageUrl} style={{filter: 'brightness(50%)', zIndex: '-3'}} size='medium'/>
                                </Reveal.Content>
                            </Reveal>
                            <Header as='h5' style={{color: 'white', marginBlockStart: '0.5em'}}>
                                <div onClick={handleOpen} onMouseOver={() => this.toggle('underlined')} onMouseOut={() => this.toggle('underlined')} style={{cursor: 'default', textDecoration: this.state.underlined ? 'underline' : 'none'}}>{playlist.name}</div>
                                <Header.Subheader style={{color: '#969696'}}>{playlist.total} song{playlist.total > 1 ? 's' : null}</Header.Subheader>
                            </Header>
                        </div>
                    </Fragment>
             </Fragment>
        )
    }
 }

 export default PlaylistCard;