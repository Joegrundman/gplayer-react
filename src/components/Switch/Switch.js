import React, {Component, PropTypes} from 'react'
import './Switch.css'


const Switch = ({switchId, onSelect, isActive}) => {
    return (
            <div className="modeswitch">
                <input type="checkbox"
                    name="modeswitch"
                    className="modeswitch-checkbox"
                    id={switchId}
                    onChange={onSelect}
                    checked={isActive}
                    />
                <label className="modeswitch-label"
                    htmlFor={switchId}
                    />
            </div>        
    )
}

// class Switch extends Component {
//     render () {
//         return (
//             <div className="modeswitch">
//                 <input type="checkbox"
//                     name="modeswitch"
//                     className="modeswitch-checkbox"
//                     id={this.props.switchId}
//                     onChange={this.props.onSelect}
//                     checked={this.props.isActive}
//                     />
//                 <label className="modeswitch-label"
//                     htmlFor={this.props.switchId}
//                     />
//             </div>
//         )
//     }
// }

Switch.propTypes = {
    switchId: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
}

export default Switch