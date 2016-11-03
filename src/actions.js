import * as types from './actiontypes'

// simple dispatches 
export const clearRandomPlaylist = () => ({ type: types.CLEAR_RANDOM_PLAYLIST })
export const decrementRandomPlaylistId = () => ({ type: types.DECREMENT_RANDOM_PLAYLIST_ID })
export const incrementRandomPlaylistId = () => ({ type: types.INCREMENT_RANDOM_PLAYLIST_ID })
export const decrementCurrentTrackId = () => ({ type: types.DECREMENT_CURRENT_TRACK_ID })
export const incrementCurrentTrackId = () => ({ type: types.INCREMENT_CURRENT_TRACK_ID })
export const fetchTrackLoading = () => ({ type: types.FETCH_TRACK_LOADING })
export const fetchTrackSuccess = () => ({ type: types.FETCH_TRACK_SUCCESS })
export const fetchTrackError = () => ({ type: types.FETCH_TRACK_ERROR })
export const setVolume = payload => ({ type: types.SET_VOLUME, payload })
export const setProgress = payload => ({ type: types.SET_PROGRESS, payload })
export const setCurrentTrackId = payload => ({ type: types.SET_CURRENT_TRACK_ID, payload })
export const setCurrentTrackName = payload => ({ type: types.SET_CURRENT_TRACK_NAME, payload })
export const setMode = payload => ({ type: types.SET_MODE, payload })
export const setIsFetching = payload => ({ type: types.SET_IS_FETCHING, payload })
export const setRandomPlaylist = payload => ({ type: types.SET_RANDOM_PLAYLIST, payload })
export const setRandomPlaylistId = payload => ({ type: types.SET_RANDOM_PLAYLIST_ID, payload })
export const setPlaylist = payload => ({ type: types.SET_PLAYLIST, payload })

// Thunks

const shuffle = (array) => {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export const createNewRandomPlaylist = (length) => {
    return function (dispatch) {
        let randomPlaylist = shuffle([...Array(length).keys()])
        dispatch(setRandomPlaylist(randomPlaylist))
    }
}

export const fetchTrack = (url) => {
    return function (dispatch) {
        dispatch(fetchTrackLoading())

        const request = new XMLHttpRequest()

        const onSuccess = () => {
            dispatch(setIsFetching(false))
        }

        const onError = (err) => {
            dispatch(fetchTrackError())
            console.log(err)
        }

        request.open('GET', url, true)
        request.responseType = 'arraybuffer'
        request.onload = () => {
            //todo
        }
        request.send()
    }
}