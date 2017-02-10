import React from 'react'
import { shallow, simulate } from 'enzyme'
import ControlButton from './ControlButton'

it('should render a ControlButton', () => {
    const wrapper = shallow(<ControlButton />)
    expect(wrapper)
})

it('should show a button on ControlButton', () => {
    const wrapper = shallow(<ControlButton />)
    expect(wrapper.find('button').length).toEqual(1)
})

it('should fire an action when button on ControlButton is clicked', () => {
    let tested = false
    const action = () => tested = true
    const wrapper = shallow(<ControlButton action={action}/>)
    expect(tested).toEqual(false)
    wrapper.find('button').simulate('click')
    expect(tested).toEqual(true)
})