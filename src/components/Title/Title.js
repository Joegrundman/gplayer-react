import React, {Component} from 'react'
import './Title.css'

// class Title extends Component {
//     render () {
//         return (
//             <div className="Title">
//                 <span className="Title-logo">gplayer</span>
//                 <a className="Title-link-to-website" href={this.props.data.webUrl} target="_blank">
//                     <span className="Title-name-and-album">{this.props.data.name} - {this.props.data.albumName}</span>
//                 </a>
//             </div>
//         )
//     }
// }

const Title = ({data}) => {
    return (
            <div className="Title">
                <span className="Title-logo">gplayer</span>
                <a className="Title-link-to-website" href={data.webUrl} target="_blank">
                    <span className="Title-name-and-album">{data.name} - {data.albumName}</span>
                </a>
            </div>
    )
}
export default Title