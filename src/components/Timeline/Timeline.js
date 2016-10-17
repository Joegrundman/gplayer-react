import React, {Component, PropTypes} from 'react'
import './Timeline.css'

class Timeline extends Component {

    componentDidMount () {
        this.timelineHead = this.refs.TimelineHead
        this.timelineContainer = this.refs.TimelineContainer
        this.timelineWidth = this.timelineContainer.offsetWidth - 
            this.timelineHead.offsetWidth
    }

    handleMoveHead (e) {
        var newWidth =  (e.pageX - this.timelineContainer.offsetLeft) / this.timelineWidth
        if (newWidth < 0) { newWidth = 0}
        else if (newWidth > 1) { newWidth = 1 }
        this.props.moveHead(newWidth)
    }

    render () {
        const fillStyle = {
            width: (this.timelineWidth * this.props.progress || 0),
            maxWidth: this.timelineWidth
        }

        return (
            <div ref="TimelineContainer" className="Timeline" onClick={this.handleMoveHead.bind(this)} >
                <div  ref="TimelineHead" className="Timeline-filling" style={fillStyle}/>
            </div> 
        )
    }
}

Timeline.propTypes = {
    progress: PropTypes.number,
    moveHead: PropTypes.func.isRequired
}

Timeline.defaultProps = {
    progress: 0
}

export default Timeline