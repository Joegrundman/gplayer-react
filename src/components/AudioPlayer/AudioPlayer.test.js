import React from 'react';
import ReactDOM from 'react-dom';
import AudioPlayer from './AudioPlayer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AudioPlayer />, div);
});
