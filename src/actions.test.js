import * as actions from './actions'

describe('actions', () => {
    it('should return a clearRandomPlaylist action', () => {
        expect(actions.clearRandomPlaylist()).toEqual({type:'CLEAR_RANDOM_PLAYLIST'})
    })
    it('should return a setVolume action', () => {
        expect(actions.setVolume(0.5)).toEqual({type: 'SET_VOLUME', payload: 0.5})
    })
})