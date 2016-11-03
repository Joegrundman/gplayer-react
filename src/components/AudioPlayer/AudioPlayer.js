import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { setPlaylist } from '../../actions'
import Title from '../Title/Title'
import Playlist from '../Playlist/Playlist'
import Controls from '../Controls/Controls'
import './AudioPlayer.css'

/**
 * The main Audio Player component.
 * @ child component Playlist is the selectable list of tracks
 * @ child component Controls contains audio controls, volume and timeline and visualizer
 * @ child component Title contains logo, playlist name and link to website
 */

class AudioPlayer extends Component {
    // constructor(props) {
    //     super(props)

    //     this.state = {
    //         currentTrackId: 0,
    //         randomPlaylist: [],
    //         mode: 'PLAY_ALL',
    //         currentRandomTrack: 0,
    //         isFetching: false,
    //     }
    //     this.playlist = this.props.musicData.playlist
    //     this.handleSelectTrack = this.handleSelectTrack.bind(this)
    //     this.skipBackward = this.skipBackward.bind(this)
    //     this.skipForward = this.skipForward.bind(this)
    //     this.setMode = this.setMode.bind(this)
    //     this.setIsFetching = this.setIsFetching.bind(this)
    // }

    componentDidMount() {
        dispatch(setPlaylist(this.props.musicData.playlist))
    }

    // handleSelectTrack(id) {
    //     this.setState({
    //         currentTrackId: id,
    //         mode: 'PLAY_ALL',
    //         randomPlaylist: []
    //     })
    // }

    // skipBackward() {
    //     if (this.state.mode === 'SHUFFLE') {
    //         this.setState({
    //             currentRandomTrack: Math.max(0, this.state.currentRandomTrack - 1),
    //             currentTrackId: this.state.randomPlaylist[this.state.currentRandomTrack]
    //         })
    //     } else {
    //         this.setState({
    //             currentTrackId: Math.max(0, this.state.currentTrackId - 1)
    //         })
    //     }
    // }

    // skipForward() {
    //     if (this.state.mode === 'SHUFFLE') {
    //         this.setState({
    //             currentRandomTrack: Math.min(this.state.randomPlaylist.length - 1, this.state.currentRandomTrack + 1),
    //             currentTrackId: this.state.randomPlaylist[this.state.currentRandomTrack]
    //         })
    //     } else {
    //         this.setState({
    //             currentTrackId: Math.min(this.playlist.length - 1, this.state.currentTrackId + 1)
    //         })
    //     }
    // }

    // setIsFetching (isFetching) {
    //     this.setState({
    //         isFetching
    //     })
    // }

    // setRandomPlaylist() {
    //     var newPlaylist = []

    //     for (var i = 0; i < this.playlist.length; i++) {
    //         newPlaylist.push(i)
    //     }

    //     var randomPlaylist = this.shuffle(newPlaylist)

    //     this.setState({
    //         randomPlaylist: randomPlaylist,
    //         mode: 'SHUFFLE',
    //         currentTrackId: randomPlaylist[0],
    //         currentRandomTrack: 0
    //     }, () => console.log('randomised', this.state.randomPlaylist))
    // }


    // setMode(mode) {
    //     console.log('mode', mode)
    //     if (mode === 'SHUFFLE') {
    //         this.setState({ mode }, () => this.setRandomPlaylist())
    //     } else if (mode === 'PLAY_ALL') {
    //         this.setState({
    //             mode,
    //             currentTrackId: 0,
    //             randomPlaylist: [],
    //             currentRandomTrack: 0
    //         })
    //     } else if (mode === 'LOOP') {
    //         this.setState({mode})
    //     }
    // }

    render() {
        return (
            <div className="AudioPlayer" style={{backgroundColor: this.props.hue}}>
                <Title data={this.props.musicData.data} />
                <div className="AudioPlayer-main-container">
                    <Playlist />
                    <Controls track={this.playlist[this.state.currentTrackId]}
                        isFetching={this.state.isFetching}
                        setIsFetching={this.setIsFetching}
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

AudioPlayer.propTypes = {
    hue: PropTypes.string,
    musicData: PropTypes.object
}

AudioPlayer.defaultProps = {
    hue: '#ffffff'
}


const mapStateToProps = (state) => {

}

const mapDispatchToProps = (dispatch) => {

} 

const ConnectedAudioPlayer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AudioPlayer)

export default ConnectedAudioPlayer