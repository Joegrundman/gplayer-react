import React, {Component, PropTypes} from 'react'
import './Volume.css'

class Volume extends Component {
    componentDidMount () {
        this.volumeHead = this.refs.VolumeHead
        this.volumeContainer = this.refs.VolumeContainer
        this.volumeWidth = this.volumeContainer.offsetWidth - this.volumeHead.offsetWidth

    }

    handleChangeVolume(e) {
        var newVol = (e.pageX - this.volumeContainer.offsetLeft) / this.volumeWidth
        if (newVol < 0) { newVol = 0 }
        else if (newVol > 1) { newVol = 1}
        this.props.changeVolume(newVol)
    }

    render () {

        const fillStyle = {
            width: this.volumeWidth * this.props.currentVolume || 0
        }
        return (
            <div ref="VolumeContainer" className="Volume" onClick={this.handleChangeVolume.bind(this)}>
                <div ref="VolumeHead" className="Volume-filling" style={fillStyle}/>
            </div> 
        )
    }
}

Volume.propTypes = {
    currentVolume: PropTypes.number.isRequired,
    changeVolume: PropTypes.func.isRequired
}

export default Volume