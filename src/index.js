import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import './index.css';
import {musicData} from './musicData'
// import lonelyBeach from './lonelybeach.jpg' 

const hue = '#eee'

ReactDOM.render(
  <AudioPlayer musicData={musicData} hue={hue}/>,
  document.getElementById('root')
);
