import React, { Component } from 'react'
import Title from '../Title/Title'
import Playlist from '../Playlist/Playlist'
import Controls from '../Controls/Controls'
import './AudioPlayer.css'

/**
 * The main Audio Player component.
 * @ child component Playlist is the selectable list of tracks
 * @ child component Controls contains audio controls, volume and timeline and visualizer
 * @ child component Title contains logo, playlist name and link to website, and options
 */

class AudioPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentTrackId: 0,
            randomPlaylist: [],
            mode: 'PLAY_ALL',
            currentRandomTrack: 0
        }
        this.playlist = this.props.musicData.playlist
        this.handleSelectTrack = this.handleSelectTrack.bind(this)
        this.skipBackward = this.skipBackward.bind(this)
        this.skipForward = this.skipForward.bind(this)
        this.setMode = this.setMode.bind(this)
    }

    handleSelectTrack(id) {
        this.setState({
            currentTrackId: id,
            mode: 'PLAY_ALL',
            randomPlaylist: []
        })
    }

    skipBackward() {
        if (this.state.mode === 'SHUFFLE') {
            this.setState({
                currentRandomTrack: Math.max(0, this.state.currentRandomTrack - 1),
                currentTrackId: this.state.randomPlaylist[this.state.currentRandomTrack]
            })
        } else {
            this.setState({
                currentTrackId: Math.max(0, this.state.currentTrackId - 1)
            })
        }
    }

    skipForward() {
        if (this.state.mode === 'SHUFFLE') {
            this.setState({
                currentRandomTrack: Math.min(this.state.randomPlaylist.length - 1, this.state.currentRandomTrack + 1),
                currentTrackId: this.state.randomPlaylist[this.state.currentRandomTrack]
            })
        } else {
            this.setState({
                currentTrackId: Math.min(this.playlist.length - 1, this.state.currentTrackId + 1)
            })
        }
    }

    setRandomPlaylist() {
        var newPlaylist = []

        for (var i = 0; i < this.playlist.length; i++) {
            newPlaylist.push(i)
        }

        var randomPlaylist = this.shuffle(newPlaylist)

        this.setState({
            randomPlaylist: randomPlaylist,
            mode: 'SHUFFLE',
            currentTrackId: randomPlaylist[0],
            currentRandomTrack: 0
        }, () => console.log('randomised', this.state.randomPlaylist))
    }


    setMode(mode) {
        console.log('mode', mode)
        if (mode === 'SHUFFLE') {
            this.setState({ mode }, () => this.setRandomPlaylist())
        } else if (mode === 'PLAY_ALL') {
            this.setState({
                mode,
                currentTrackId: 0,
                randomPlaylist: [],
                currentRandomTrack: 0
            })
        } else if (mode === 'LOOP') {
            this.setState({mode})
        }
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    render() {
        return (
            <div className="AudioPlayer" style={{backgroundColor: this.props.hue}}>
                <Title data={this.props.musicData.data} />
                <div className="AudioPlayer-main-container">
                    <Playlist playlist={this.props.musicData.playlist}
                        activeId={this.state.currentTrackId}
                        handleSelectTrack={this.handleSelectTrack}
                        />
                    <Controls track={this.playlist[this.state.currentTrackId]}
                        skipBackward={this.skipBackward}
                        skipForward={this.skipForward}
                        setMode={this.setMode}
                        mode={this.state.mode}
                        />
                </div>
            </div>
        )
    }
}

export default AudioPlayer