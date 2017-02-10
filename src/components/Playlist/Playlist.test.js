import React from 'react'
import { shallow } from 'enzyme'

import Playlist from './Playlist.component'

it('should render a playlist component', () => {
    const wrapper = shallow(<Playlist />)
    expect(wrapper)
})