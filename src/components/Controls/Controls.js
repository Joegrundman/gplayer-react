import React, {Component} from 'react'
import ControlButton from '../ControlButton/ControlButton'
import Timeline from '../Timeline/Timeline'
import Volume from '../Volume/Volume'
import './Controls.css'

class Controls extends Component {
    constructor(props){
        super(props)

        this.state = {
            progress: 0,
            duration: 0,
            currentVolume: 0.7
        }
        
        this.pause = this.pause.bind(this)
        this.play = this.play.bind(this)
        this.skipForward = this.skipForward.bind(this)
        this.skipBackward = this.skipBackward.bind(this)
        this.timeUpdate = this.timeUpdate.bind(this)
        this.handleEndTrack = this.handleEndTrack.bind(this)
        this.setDuration = this.setDuration.bind(this)
        this.onChangeVolume = this.onChangeVolume.bind(this)
        this.onMoveHead = this.onMoveHead.bind(this)
    }

    componentDidMount () {
        this.audio = this.refs.audioNode
        this.audio.addEventListener("ended", this.handleEndTrack, false)
        this.audio.addEventListener("timeupdate", this.timeUpdate, false)
        this.audio.addEventListener("canplaythrough", this.setDuration, false)
        this.audio.volume = this.state.currentVolume
    }

    handleEndTrack () {
        this.skipForward()
    }

    onChangeVolume (newVol) {
        this.setState({
            currentVolume: newVol
        }, () => this.audio.volume = this.state.currentVolume)
    }

    onMoveHead(newProgress) {
        this.audio.currentTime = newProgress
    }

    pause () {
        this.audio.pause()
    }

    play () {
        this.audio.play()
    }

    setDuration () {
        this.setState({
            duration: this.audio.duration
        })
    }

    skipBackward () {
        this.props.skipBackward()
    }

    skipForward () {
        this.props.skipForward()
    }

    timeUpdate () {
        this.setState({
            progress: this.audio.currentTime
        })
    }

    render () {

        return (
            <div className="Controls">
                <p className="Controls-tracktitle">{this.props.track.name}</p>
                <audio className="Controls-audioconsole" ref="audioNode" src={this.props.track.src} autoPlay>
                    <p> Your browser does not support this audio player </p>
                </audio>
                <ControlButton ionClass="ion-skip-backward" action={this.skipBackward} />
                <ControlButton ionClass="ion-play" action={this.play} />
                <ControlButton ionClass="ion-pause" action={this.pause} />
                <ControlButton ionClass="ion-skip-forward" action={this.skipForward} />
                <div className="Controls-progressbar-container" >
                    <Timeline progress={this.state.progress} duration={this.state.duration} moveHead={this.onMoveHead} />
                    <i className="ion-volume-medium"></i>
                    <Volume currentVolume={this.state.currentVolume} changeVolume={this.onChangeVolume} />

                </div>

            </div>
        )
    }
}

export default Controls