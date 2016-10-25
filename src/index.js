import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import reducer from './reducer'
import './index.css';
import {musicData} from './musicData'

const hue = '#ddd'

let store = createStore(reducer)

const App = (
  <Provider store={store}>
      <AudioPlayer musicData={musicData} hue={hue}/>
  </Provider>
    
)

render(App, document.getElementById('root'));
