import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import './index.css';
import {musicData} from './musicData'

const hue = '#e9e9e5'

ReactDOM.render(
  <AudioPlayer musicData={musicData} hue={hue}/>,
  document.getElementById('root')
);
