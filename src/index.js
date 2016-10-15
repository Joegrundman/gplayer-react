import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import './index.css';
import {musicData} from './musicData'


ReactDOM.render(
  <AudioPlayer musicData={musicData}/>,
  document.getElementById('root')
);
