import React, {Component, PropTypes} from 'react'
import './Switch.css'

class Switch extends Component {
    render () {
        return (
            <div className="onoffswitch">
                <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id={this.props.switchId} onChange={e => console.log('flicked')} />
                <label className="onoffswitch-label" htmlFor={this.props.switchId}>
                    <span className="onoffswitch-inner"></span>
                    <span className="onoffswitch-switch"></span>
                </label>
            </div>
        )
    }
}

Switch.propTypes = {
    switchId: PropTypes.string.isRequired
}

export default Switch