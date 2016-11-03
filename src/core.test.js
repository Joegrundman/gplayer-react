import deepFreeze from 'deep-freeze'
import {
    increment,
    decrement,
    update
} from './core'


it('should immutably update different properties using update function', () => {
    const state = { currentTrackName: ''  }
    deepFreeze(state)
    const nextState =  update(state, 'currentTrackName', 'nurneenur')
    expect(nextState.currentTrackName).toEqual('nurneenur')
    deepFreeze(nextState)
    const anotherState = update(nextState, 'banana', 4)
    expect(anotherState.banana).toEqual(4)
})

it('should decrement a value', () => {
    const val = 3
    const nextVal = decrement(val)
    expect(nextVal).toEqual(2)
})

it('should not decrement below zero', () => {
    const val = 0
    const nextVal = decrement(val)
    expect(nextVal).toEqual(0)
})

it('should increment a value', () => {
    const val = 3
    const maxLen = 6
    const nextVal = increment(val, maxLen)
    expect(nextVal).toEqual(4)
})

it('should not increment beyond maxLen', () => {
    const val = 5
    const maxLen = 5
    const nextVal = increment(val, maxLen)
    expect(nextVal).toEqual(5)
})
