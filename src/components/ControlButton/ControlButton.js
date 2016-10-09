import React, {Component} from 'react'
import './ControlButton.css'

class ControlButton extends Component {
    render () {
        return (
            <button className="ControlButton" onClick={this.props.action}>
            <i className={this.props.ionClass} />
            </button>
        )
    }
}

export default ControlButton