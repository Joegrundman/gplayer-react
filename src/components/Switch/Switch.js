import React, {Component} from 'react'
import './Switch.css'

class Switch extends Component {
    render () {
        return (
            <div className="onoffswitch">
                <input type="checkbox" name="onoffswitch" className="onoffswitch-checkbox" id="myonoffswitch" checked />
                <label className="onoffswitch-label" htmlFor="myonoffswitch">
                    <span className="onoffswitch-inner"></span>
                    <span className="onoffswitch-switch"></span>
                </label>
            </div>
        )
    }
}

export default Switch