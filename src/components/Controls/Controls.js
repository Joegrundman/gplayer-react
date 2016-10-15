import React, { Component } from 'react'
import ControlButton from '../ControlButton/ControlButton'
import Timeline from '../Timeline/Timeline'
import Volume from '../Volume/Volume'
// import Visualizer from '../Visualizer/Visualizer'
import './Controls.css'

class Controls extends Component {
    constructor(props) {
        super(props)

        this.state = {
            progress: 0,
            duration: 0,
            currentTrackName: '',
            currentVolume: 0.7,
            isPaused: false,
            isPlaying: false
        }

        this.visHeight = 200
        this.visWidth = 300

        this.bufferCache = {}
        this.pause = this.pause.bind(this)
        this.play = this.play.bind(this)
        this.skipForward = this.skipForward.bind(this)
        this.skipBackward = this.skipBackward.bind(this)
        this.setDuration = this.setDuration.bind(this)
        this.onChangeVolume = this.onChangeVolume.bind(this)
        this.onMoveHead = this.onMoveHead.bind(this)
        this.drawVisualOscillator =  this.drawVisualOscillator.bind(this)
        this.drawVisualBars = this.drawVisualBars.bind(this)
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
        if (this.props.track.name !== this.state.currentTrackName){

            this.setState({
                isPaused: false,
                duration: 0,
                progress: 0,
                currentTrackName: this.props.track.name
            }, () => {
                this.audioContext.close().then(() => {
                    this.buffer = null
                    this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
                    this.requestAndInitAudio(true)
                })
            })
        }
    }

    onChangeVolume(newVol) {
        console.log('newVol', newVol)
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
        // this.audio.currentTime = newProgress
        // this.audioContext.currentTime = newProgress * this.state.duration
        this.buffer = this.bufferCache[this.props.track.name]
        this.initAudio()
        this.play(newProgress * this.state.duration)
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

    startAudioApi(offset) {
        var _this = this
        if(!offset) {offset = 0}
        this.setState({
            isPlaying: true
        }, () => { 
            this.source.start(offset)
            this.setTimeListener()
            this.gainNode.gain.value = this.state.currentVolume
            // this.drawVisualOscillator()
            this.drawVisualBars()
        })

    }

    drawVisualBars () {
        requestAnimationFrame(this.drawVisualBars)
        this.analyser.getByteFrequencyData(this.dataArray)

        this.canvasCtx.clearRect(0, 0, this.visWidth, this.visHeight)

        var barWidth = ((this.visWidth / this.bufferLength) * 2.5) - 5
        var barHeight
        var x = 0

        for (var i = 0; i < this.bufferLength; i++){
            barHeight = this.dataArray[i] 

            this.canvasCtx.fillStyle = 'rgba(0, 0, 0, 0.3)'
            this.canvasCtx.fillRect(x, this.visHeight - barHeight / 2, barWidth, barHeight)
            
            x += barWidth + 5
        }
    }

    drawVisualOscillator () {
        requestAnimationFrame(this.drawVisualOscillator)
        this.analyser.getByteTimeDomainData(this.dataArray)

        this.canvasCtx.clearRect(0, 0, this.visWidth, this.visHeight)
        this.canvasCtx.lineWidth = 2
        this.canvasCtx.strokeStyle = 'rgba(0,0,0,0.3)'

        this.canvasCtx.beginPath()

        var sliceWidth =  this.visWidth * 1.0 / this.bufferLength
        var x = 0

        for(var i = 0; i < this.bufferLength; i++){
            var v = this.dataArray[i] / 128.0
            var y =  v *  this.visHeight/2

            if (i ===0) {
                this.canvasCtx.moveTo(x, y)
            } else {
                this.canvasCtx.lineTo(x, y)
            }

            x += sliceWidth
        }

        this.canvasCtx.lineTo(this.canvas.width, this.canvas.height/2)
        this.canvasCtx.stroke()
    }

    initAudio() {
        this.source = this.audioContext.createBufferSource()
        this.source.buffer = this.buffer
        this.gainNode = this.audioContext.createGain()
        this.analyser = this.audioContext.createAnalyser()
        this.source.connect(this.analyser)
        this.analyser.connect(this.gainNode)
        this.gainNode.connect(this.audioContext.destination)
        // this.analyser.fftSize = 2056 // for oscilaator
        this.analyser.fftSize = 64 // for barchart
        // this.bufferLength = this.analyser.fftSize // for oscillator
        this.bufferLength = this.analyser.frequencyBinCount // for bar chart
        this.dataArray = new Uint8Array(this.bufferLength)
        this.analyser.getByteTimeDomainData(this.dataArray)
        this.setState({
            duration: this.source.buffer.duration
        })
        this.source.onended = () => this.skipForward()
    }

    requestAndInitAudio(shouldAutoplay) {

        if (this.props.track && this.bufferCache.hasOwnProperty(this.props.track.name)) {
            console.log('getting resource from cache')
            this.buffer = this.bufferCache[this.props.track.name]
            this.initAudio()
            if (shouldAutoplay) {
                this.startAudioApi()
            }
        } else {
            console.log('fetching resource with xhr')
            const request = new XMLHttpRequest()

            const onSuccess = buffer => {
                this.buffer = buffer
                this.bufferCache[this.props.track.name] = buffer
                this.initAudio()
                if (shouldAutoplay) {
                    this.startAudioApi()
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

    setDuration() {
        this.setState({
            duration: this.audio.duration
        })
    }

    skipBackward() {
        this.props.skipBackward()
    }

    skipForward() {
        this.props.skipForward()
    }

    setTimeListener() {
        var lastProgress = 0
        window.setInterval(() => {
            var nextProgress = this.audioContext.currentTime / this.state.duration
            if (nextProgress !== lastProgress) {
                if (isNaN(nextProgress)) {
                    nextProgress = 0
                }
                lastProgress = nextProgress
                this.setState({
                    progress: nextProgress
                })
            }
        }, 100)
    }


    render() {

        const visualizerStyle = {
            width: this.visWidth,
            height: this.visHeight
        }

        const timeDisplay = ((Math.floor(this.state.progress * this.state.duration) || 0) + '/' + Math.floor(this.state.duration) + 's')

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
                <div className="Control-visualizer">
                <canvas className="Control-visualizer-canvas" ref="visualizer" style={visualizerStyle} />
                </div>

            </div>
        )
    }
}



export default Controls