import React, {Component} from 'react'
import Title from '../Title/Title'
import Playlist from '../Playlist/Playlist'
import Controls from '../Controls/Controls'
import './AudioPlayer.css'

/**
 * The main Audio Player component.
 * @ child component Playlist is the selectable list of tracks
 * @ child component Controls contains audio controls, volume and timeline and visualizer
 * @ child component Title contains logo, playlist name and link to website, and options
 */

class AudioPlayer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentTrackId: 0
        }
        this.playlist = this.props.musicData.playlist
        this.handleSelectTrack =  this.handleSelectTrack.bind(this)
        this.skipBackward = this.skipBackward.bind(this)
        this.skipForward = this.skipForward.bind(this)
    }

    handleSelectTrack(id) {
        this.setState({
            currentTrackId: id
        })
    }

    skipBackward() {
        this.setState({
            currentTrackId: Math.max(0, this.state.currentTrackId - 1)
        })
    }

    skipForward() {
        this.setState({
            currentTrackId: Math.min(this.playlist.length - 1, this.state.currentTrackId + 1)
        })
    }

    render () {
        return (
            <div className="AudioPlayer">
                <Title data={this.props.musicData.data}/>
                <div className="AudioPlayer-main-container">
                    <Playlist playlist={this.props.musicData.playlist}
                            activeId={this.state.currentTrackId}
                            handleSelectTrack={this.handleSelectTrack}
                     />
                    <Controls track={this.playlist[this.state.currentTrackId]} 
                        skipBackward={this.skipBackward}
                        skipForward={this.skipForward}
                    />
                </div>
            </div>
        )
    }
}

export default AudioPlayer