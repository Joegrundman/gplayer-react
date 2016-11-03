import React from 'react';
import thunkMiddleware from 'reduc-thunkMiddleware'
import createLogger from 'redux-logger'
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import reducer from './reducer'
import './index.css';
import {musicData} from './musicData'

const hue = '#ddd'

const loggerMiddleware = createLogger()

let store = createStore(
  reducer, 
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
  )

const App = (
  <Provider store={store}>
      <AudioPlayer musicData={musicData} hue={hue}/>
  </Provider>
    
)

render(App, document.getElementById('root'));
