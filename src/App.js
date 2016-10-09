import React, { Component } from 'react';
import AudioPlayer from './components/AudioPlayer/AudioPlayer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AudioPlayer musicData={this.props.musicData}/>
      </div>
    );
  }
}

export default App;
