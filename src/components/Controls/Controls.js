import React, { Component } from 'react'
import ControlButton from '../ControlButton/ControlButton'
import Timeline from '../Timeline/Timeline'
import Volume from '../Volume/Volume'
import Switch from '../Switch/Switch'
import './Controls.css'

class Controls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            progress: 0,
            duration: 0,
            currentTrackName: '',
            currentVolume: 0.7,
            isPaused: false
        }

        //  visualiser canvas dimensions
        this.visHeight = 200
        this.visWidth = 340
        this.isFetching = false
        this.bufferCache = {}

        // method bindings
        this.pause = this.pause.bind(this)
        this.play = this.play.bind(this)
        this.skipForward = this.skipForward.bind(this)
        this.skipBackward = this.skipBackward.bind(this)
        this.onChangeVolume = this.onChangeVolume.bind(this)
        this.onMoveHead = this.onMoveHead.bind(this)
        this.drawVisualBars = this.drawVisualBars.bind(this)
        this.setPlayAll = this.setPlayAll.bind(this)
        this.setLoop = this.setLoop.bind(this)
        this.setShuffle = this.setShuffle.bind(this)
        this.handleEndTrack = this.handleEndTrack.bind(this)
    }

    componentDidMount() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.canvas = this.refs.visualizer
        this.canvasCtx = this.canvas.getContext("2d")
        
        this.setState({
            currentTrackName: this.props.track.name
        }, () => this.requestAndInitAudio())
    }

    componentDidUpdate() {       
        if (this.props.track.name !== this.state.currentTrackName && !this.props.isFetching){
            this.setState({
                isPaused: false,
                duration: 0,
                progress: 0,
                currentTrackName: this.props.track.name
            }, this.restartPlayer)
        }
    }

    drawVisualBars () {
        requestAnimationFrame(this.drawVisualBars)
        this.analyser.getByteFrequencyData(this.dataArray)

        this.canvasCtx.clearRect(0, 0, this.visWidth, this.visHeight)
        var barWidthMultiplier = 1
        var barWidth = ((this.visWidth / this.bufferLength) * barWidthMultiplier) - 5
        var barHeight
        var x = 0

        for (var i = 0; i < this.bufferLength; i++){
            barHeight = this.dataArray[i] 

            this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
            this.canvasCtx.fillRect(x, this.visHeight - barHeight / 2, barWidth, barHeight)
            
            x += barWidth + 5
        }
    }

    handleEndTrack () {
        switch(this.props.mode) {
            case 'PLAY_ALL': this.skipForward(); break;
            case 'LOOP': this.restartPlayer(0); break;
            case 'SHUFFLE': this.skipForward(); break; 
            default: this.source.stop(); break;
        }
    }

    initAudio() {
        this.source = this.audioContext.createBufferSource()
        this.source.buffer = this.buffer
        this.gainNode = this.audioContext.createGain()
        this.analyser = this.audioContext.createAnalyser()
        this.source.connect(this.analyser)
        this.analyser.connect(this.gainNode)
        this.gainNode.connect(this.audioContext.destination)

        this.analyser.fftSize = 32 
        this.bufferLength = this.analyser.frequencyBinCount 
        this.dataArray = new Uint8Array(this.bufferLength)
        this.analyser.getByteTimeDomainData(this.dataArray)
        this.setState({
            duration: this.source.buffer.duration
        })
    }

    nextRandom () {
        // no action needed
    }

    onChangeVolume(newVol) {
        this.setState({
            currentVolume: newVol
        }, () => {
            console.log('currentVolume', this.state.currentVolume)
            if (this.gainNode) {
                this.gainNode.gain.value = this.state.currentVolume
            }
        })
    }

    onMoveHead(newProgress) {
        var startFromTime =  this.state.duration * newProgress
        this.setState({
            onendedEnabled: false,
            progress: newProgress
        }, this.restartPlayer(startFromTime))
    }

    pause() {
        this.setState({
            isPaused: true
        }, () => this.audioContext.suspend())

    }

    play() {
        if (this.state.isPaused) {
            this.setState({
                isPaused: false
            }, () => this.audioContext.resume())
        } else {
            this.startAudioApi()
        }
    }

    restartPlayer(offsetTime) {
            this.audioContext.close()
            .then(() => {
                clearInterval(this.timeListener)
                this.buffer = null
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
                this.requestAndInitAudio(true, offsetTime)
                window.setTimeout(() =>this.setState({onendedEnabled: true}), 500)
            })
   
    }

    startAudioApi(offset) {
        if(!offset) {offset = 0}
        this.props.setIsFetching(false)
        this.source.start(0, offset)
        this.setTimeListener(offset)
        this.gainNode.gain.value = this.state.currentVolume
        this.drawVisualBars()
        this.source.onended = this.handleEndTrack
    }


    requestAndInitAudio(shouldAutoplay, offset) {

        if (this.props.track && this.bufferCache.hasOwnProperty(this.props.track.name)) {
            this.buffer = this.bufferCache[this.props.track.name]
            this.initAudio()
            if (shouldAutoplay) {
                this.startAudioApi(offset)
            }
        } else {
            this.props.setIsFetching(true)

            const request = new XMLHttpRequest()

            const onSuccess = buffer => {
                this.buffer = buffer
                this.bufferCache[this.props.track.name] = buffer
                this.initAudio()
                if (shouldAutoplay) {
                    this.startAudioApi(offset)
                }
            }

            const onError = error => console.log(error)

            request.open('GET', this.props.track.src, true)
            request.responseType = 'arraybuffer'
            request.onload = () => {
                this.audioContext.decodeAudioData(request.response, onSuccess, onError)

            }
            request.send()
        }
    }

    setTimeListener(offset = 0) {
        var lastProgress = 0
        this.timeListener = window.setInterval(() => {
            var nextProgress = (this.audioContext.currentTime + offset) / this.state.duration
            if (nextProgress !== lastProgress) {
                if (isNaN(nextProgress)) {
                    nextProgress = 0
                }
                lastProgress = nextProgress
                this.setState({
                    progress: nextProgress
                }, () => {
                    if(nextProgress >= 1.001){this.skipForward()}
                })
            }
        }, 300)
    }


    skipBackward() {
        if(this.props.isFetchimg) { return }
        if(this.state.progress > 0.02) {
            this.restartPlayer(0)
        } else {
           this.props.skipBackward()
        }

    }

    skipForward() {
        if(this.props.isFetching){ return  }
        this.props.skipForward()
    }
    
    setPlayAll () {
        this.props.setMode('PLAY_ALL')
    }

    setLoop () {
        this.props.setMode('LOOP')
    }

    setShuffle () {
        this.props.setMode('SHUFFLE')
    }


    render() {

        const visualizerStyle = {
            width: this.visWidth,
            height: this.visHeight
        }

        const format = (timeInSecs) => {
            const mins = Math.floor(timeInSecs / 60)
            var secs = '' + timeInSecs % 60
            if (secs.length < 2) { secs = "0" + secs}
            return '' + mins + ":" + secs
        }

        const timeDisplay = (format(Math.floor(this.state.progress * this.state.duration) || 0) + '/' + format(Math.floor(this.state.duration)))

        return (
            <div className="Controls">
                <p className="Controls-tracktitle">{this.props.track.name}</p>

                <ControlButton ionClass="ion-skip-backward" action={this.skipBackward} />
                <ControlButton ionClass="ion-play" action={this.play} />
                <ControlButton ionClass="ion-pause" action={this.pause} />
                <ControlButton ionClass="ion-skip-forward" action={this.skipForward} />
                <div className="Controls-progressbar-container" >
                    <Timeline progress={this.state.progress} moveHead={this.onMoveHead} />
                    <i className="ion-volume-medium"></i>
                    <Volume currentVolume={this.state.currentVolume} changeVolume={this.onChangeVolume} />
                </div>
                <br />
                <span className="Controls-current-time">{timeDisplay}</span>
                <br />
                <div className="Controls-switch-container">
                    <i className="ion-play Controls-icon"></i>
                    <Switch switchId="playAll" onSelect={this.setPlayAll} isActive={this.props.mode === "PLAY_ALL"} />
                    <i className="ion-shuffle Controls-icon"></i>
                    <Switch switchId="shuffle" onSelect={this.setShuffle} isActive={this.props.mode === "SHUFFLE"} />
                    <i className="ion-loop Controls-icon"></i>
                    <Switch switchId="loop" onSelect={this.setLoop} isActive={this.props.mode === "LOOP"} />
                </div>
                <div className="Control-visualizer">
                    <canvas className="Control-visualizer-canvas" 
                            ref="visualizer" 
                            style={visualizerStyle} />
                </div>

            </div>
        )
    }
}



export default Controls