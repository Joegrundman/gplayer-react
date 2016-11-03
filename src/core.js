
export const update = (state, target, payload) => {
    if(typeof payload === 'function') {
        const val = state[target] || -1
        const maxVal = state.playlist ? state.playlist.length - 1 : 100
        payload = payload(val, maxVal)
    }
    return {...state, [target]: payload}
}

export const decrement = (val) => Math.max(val - 1, 0)
export const increment = (val, maxVal) => Math.min(val + 1, maxVal)