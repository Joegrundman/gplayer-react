import React, {PropTypes} from 'react'
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

export default Playlist