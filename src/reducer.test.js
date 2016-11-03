import reducer from './reducer'
import * as actions from './actions'
import deepFreeze from 'deep-freeze'

// integration test of the action -> reducer -> core sequence


it('should setVolume', () => {
    const state = {
        currentVolume: 0.4
    }
    deepFreeze(state)
    const action = actions.setVolume(0.7)
    const nextState = reducer(state, action)
    expect(nextState.volume).toEqual(0.7)
})

it('should clearRandomPlaylist', () => {
    const state = {
        randomPlaylist: [4, 2, 9]
    }
    deepFreeze(state)
    const action = actions.clearRandomPlaylist()
    const nextState = reducer(state, action)
    expect(nextState.randomPlaylist).toEqual([])
})

it('should setProgress', () => {
    const state = {
        progress: 0.65
    }
    deepFreeze(state)
    const action = actions.setProgress(0.43)
    const nextState = reducer(state, action)
    expect(nextState.progress).toEqual(0.43)
})

it('should set currentTrackId', () => {
    const state = {
        currentTrackId: 3
    }
    deepFreeze(state)
    const action = actions.setCurrentTrackId(6)
    const nextState = reducer(state, action)
    expect(nextState.currentTrackId).toEqual(6)
})


it('should set currentTrackName', () => {
    const state = {
        currentTrackName: 'Cry'
    }
    deepFreeze(state)
    const action = actions.setCurrentTrackName('Silky')
    const nextState = reducer(state, action)
    expect(nextState.currentTrackName).toEqual('Silky')
})


it('should set mode', () => {
    const state = {
        mode: 'SHUFFLE'
    }
    deepFreeze(state)
    const action = actions.setMode('LOOP')
    const nextState = reducer(state, action)
    expect(nextState.mode).toEqual('LOOP')
})


it('should set isFetching', () => {
    const state = {
        isFetching: true
    }
    deepFreeze(state)
    const action = actions.setIsFetching(false)
    const nextState = reducer(state, action)
    expect(nextState.isFetching).toEqual(false)
})


it('should set playlist', () => {
    const state = {
        playlist: [{"a":"a"}, {"b": "b"}]
    }
    deepFreeze(state)
    const action = actions.setPlaylist([{"c":"c"}, {"d": "d"}])
    const nextState = reducer(state, action)
    expect(nextState.playlist).toEqual([{"c":"c"}, {"d": "d"}])
})

it('should set a randomplaylist', () => {
    const state = {
        randomPlaylist: []
    }
    deepFreeze(state)
    const action = actions.setRandomPlaylist(['3', '7', '2'])
    const nextState = reducer(state, action)
    expect(nextState.randomPlaylist).toEqual(['3', '7', '2'])
})

it('should increment currentTrackId', () => {
    const state = {
        currentTrackId: 3
    }
    deepFreeze(state)
    const action = actions.incrementCurrentTrackId()
    const nextState = reducer(state, action)
    expect(nextState.currentTrackId).toEqual(4)        
})

it('should decrement currentTrackId', () => {
    const state = {
        currentTrackId: 3
    }
    deepFreeze(state)
    const action = actions.decrementCurrentTrackId()
    const nextState = reducer(state, action)
    expect(nextState.currentTrackId).toEqual(2)        
})

it('should increment currentTrackId', () => {
    const state = {
        currentTrackId: 3
    }
    deepFreeze(state)
    const action = actions.incrementCurrentTrackId()
    const nextState = reducer(state, action)
    expect(nextState.currentTrackId).toEqual(4)        
})

it('should not increment currentTrackId beyond playlist length -1', () => {
    const state = {
        currentTrackId: 3,
        playlist: [0, 0, 0, 0]
    }
    deepFreeze(state)
    const action = actions.incrementCurrentTrackId()
    const nextState = reducer(state, action)
    expect(nextState.currentTrackId).toEqual(3)        
})

it('should decrement currentTrackId', () => {
    const state = {
        currentTrackId: 3
    }
    deepFreeze(state)
    const action = actions.decrementCurrentTrackId()
    const nextState = reducer(state, action)
    expect(nextState.currentTrackId).toEqual(2)        
})

it('should increment randomPlaylistId', () => {
    const state = {
        randomPlaylistId: 3
    }
    deepFreeze(state)
    const action = actions.incrementRandomPlaylistId()
    const nextState = reducer(state, action)
    expect(nextState.randomPlaylistId).toEqual(4)        
})

it('should decrement randomPlaylistId', () => {
    const state = {
        randomPlaylistId: 3
    }
    deepFreeze(state)
    const action = actions.decrementRandomPlaylistId()
    const nextState = reducer(state, action)
    expect(nextState.randomPlaylistId).toEqual(2)        
})
