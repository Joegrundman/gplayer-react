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
        var newWidth =  (e.pageX - this.timelineContainer.offsetLeft)
        if (newWidth < 0) { newWidth = 0}
        else if (newWidth > this.timelineWidth) {
            newWidth = this.timelineWidth
        }
        this.props.moveHead(this.props.duration * (newWidth / this.timelineWidth))
    }

    render () {

        const fillStyle = {
            width: this.timelineWidth * (this.props.progress / this.props.duration) || 0
        }

        return (
            <div ref="TimelineContainer" className="Timeline" onClick={this.handleMoveHead.bind(this)} >
                <div  ref="TimelineHead" className="Timeline-filling" style={fillStyle}/>
            </div> 
        )
    }
}

Timeline.propTypes = {
    progress: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
    moveHead: PropTypes.func.isRequired
}

export default Timeline