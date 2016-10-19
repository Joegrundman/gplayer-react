import React, {Component} from 'react'
import './Playlist.css'

class Playlist extends Component {

    render () {
        const playlist =  this.props.playlist.map((track, i) => (
            <div className={ i === this.props.activeId ? 'Playlist-cell Playlist-isplaying' : 'Playlist-cell'}
                onClick={!this.props.isFetching ? e => this.props.handleSelectTrack(i): null}
                key={i} >
                <p> Track: {i + 1} - {track.name}</p>
            </div>
        ))
        return (
            <div className="Playlist">
            {playlist}
            </div>
        )
    }
}

export default Playlist