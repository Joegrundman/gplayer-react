import { decrement, increment, update } from './core'
import * as types from './actiontypes'

const reducer = (state = {}, action) => {
    const payload = action.payload
    switch(action.type) {
        case types.CLEAR_RANDOM_PLAYLIST: return update(state, 'randomPlaylist', [])
        case types.DECREMENT_RANDOM_PLAYLIST_ID: return update(state, 'randomPlaylistId', decrement)
        case types.DECREMENT_CURRENT_TRACK_ID: return update(state, 'currentTrackId', decrement)
        case types.INCREMENT_RANDOM_PLAYLIST_ID: return update(state, 'randomPlaylistId', increment)
        case types.INCREMENT_CURRENT_TRACK_ID: return update(state, 'currentTrackId', increment)
        case types.FETCH_TRACK_LOADING: return update(state, 'isFetching', true)
        case types.FETCH_TRACK_SUCCESS: return update(state, 'isFetching', false)
        case types.FETCH_TRACK_ERROR: return update(state, 'isFetching', false)
        case types.SET_CURRENT_TRACK_ID: return update(state, 'currentTrackId' ,payload)
        case types.SET_CURRENT_TRACK_NAME: return update(state, 'currentTrackName', payload)
        case types.SET_IS_PAUSED: return update(state, 'isPaused', payload)
        case types.SET_MODE: return update(state, 'mode', payload)
        case types.SET_PLAYLIST: return update(state, 'playlist', payload)
        case types.SET_PROGRESS: return update(state, 'progress', payload)
        case types.SET_RANDOM_PLAYLIST_ID: return update(state, 'randomPlaylistId', payload)
        case types.SET_RANDOM_PLAYLIST: return update(state, 'randomPlaylist', payload)
        case types.SET_VOLUME: return update(state, 'volume', payload)
        default: return state
    }
}

export default reducer