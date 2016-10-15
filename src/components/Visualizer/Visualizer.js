import React, {Component} from 'react'
import './Visualizer.css'

class Visualizer extends Component {
    constructor(props) {
        super(props)
        this.visHeight = 200
        this.visWidth = 300
        this.drawVisualBars = this.drawVisualBars.bind(this)

    }

    componentDidMount () {
        this.canvas = this.refs.VisualizerCanvas
        this.ctx = this.canvas.getContext("2d")
        if(this.props.isPlaying){
            this.draw()
        }
    }

    componentDidlUpdate(nextProps){
        if(this.props.isPlaying){
            this.drawVisualBars()
        }
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

    draw() {
        requestAnimationFrame(this.draw)
        this.props.analyser.getByteFrequencyData(this.props.dataArray)
        var barWidth = (300 / this.props.bufferLength) * 2.5
        var barHeight
        var x = 0
        for(var i =0; i < this.props.bufferLength; i++) {
            barHeight = this.props.dataArray[i] / 2
            this.ctx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`
            this.ctx.fillRect(x, 200 - barHeight/2, barWidth, barHeight)
            x += barWidth + 1
        }
        // this.ctx.fillStyle="#ff0000"
        // this.ctx.fillRect(10, 10, 20, 20)
    }

    render () {
        const visualizerStyle = {
            width: this.visWidth,
            height: this.visHeight
        }

        return (
            <div className="Visualizer">
                <canvas ref="VisualizerCanvas" style={visualizerStyle}/>
            
            </div>
        )
    }
}


export default Visualizer