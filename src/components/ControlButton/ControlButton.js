import React, {Component, PropTypes} from 'react'
import './ControlButton.css'

// class ControlButton extends Component {
//     render () {
//         return (
//             <button className="ControlButton" onClick={this.props.action}>
//             <i className={this.props.ionClass} />
//             </button>
//         )
//     }
// }

const ControlButton = ({action, ionClass}) => (
    <button className="ControlButton" onClick={action}>
        <i className={ionClass} />
    </button>
)

ControlButton.propTypes = {
    action: PropTypes.func,
    ionClass: PropTypes.string
}

export default ControlButton