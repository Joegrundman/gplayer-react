import React, {Component} from 'react'
import Title from '../Title/Title'
import Playlist from '../Playlist/Playlist'
import Controls from '../Controls/Controls'
import './AudioPlayer.css'

class AudioPlayer extends Component {
    constructor (props) {
        super(props)
        this.state = {
            currentTrackId: 0,
            duration: 0,
            playPercent: 0
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
        var nextId = 0
        const oldId = this.state.currentTrackId
        if(oldId > nextId) {
            nextId = oldId -1
        }
        this.setState({
            currentTrackId: nextId
        })
    }

    skipForward() {
        var nextId = this.playlist.length - 1
        const oldId = this.state.currentTrackId
        if(oldId < nextId) {
            nextId = oldId + 1
        }
        this.setState({
            currentTrackId: nextId
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