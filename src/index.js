import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {musicData} from './musicData'


ReactDOM.render(
  <App musicData={musicData}/>,
  document.getElementById('root')
);
