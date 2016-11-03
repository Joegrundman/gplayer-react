import React, {Component, PropTypes} from 'react'
import { connect } from 'react-redux'
import { setCurrentTrackId, clearRandomPlaylist, setMode } from '../../actions'
import {MODE} from '../../constants'
import './Playlist.css'

const Playlist = ({playlist, activeId, isFetching, handleSelectTrack}) => {
        const playlistSelectors =  playlist.map((track, i) => (
            <div className={ i === activeId ? 'Playlist-cell Playlist-isplaying' : 'Playlist-cell'}
                onClick={!isFetching ? e => handleSelectTrack(i): null}
                key={i} >
                <p> Track: {i + 1} - {track.name}</p>
            </div>
        ))
        return (
            <div className="Playlist">
            {playlistSelectors}
            </div>
        )
}

Playlist.propTypes = {
    playlist: PropTypes.object,
    activeId: PropTypes.number,
    isFetching: PropTypes.bool,
    handleSelectTrack: PropTypes.func
}


const mapStateToProps = (state) => {
    return {
        activeId: state.currentTrackId,
        playlist: state.playlist,
        isFetching: state.isFetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleSelectTrack: (i) => {
            dispatch(clearRandomPlaylist())
            dispatch(setCurrentTrackId(i))
            dispatch(setMode(MODE.PLAY_ALL))
        } 
    }
}

const ConnectedPlaylist = connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)
// class Playlist extends Component {

//     render () {
//         const playlist =  this.props.playlist.map((track, i) => (
//             <div className={ i === this.props.activeId ? 'Playlist-cell Playlist-isplaying' : 'Playlist-cell'}
//                 onClick={!this.props.isFetching ? e => this.props.handleSelectTrack(i): null}
//                 key={i} >
//                 <p> Track: {i + 1} - {track.name}</p>
//             </div>
//         ))
//         return (
//             <div className="Playlist">
//             {playlist}
//             </div>
//         )
//     }
// }

export default ConnectedPlaylist