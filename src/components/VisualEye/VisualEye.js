import spiral from '../../assets/images/icons/Spiral.svg'
import visualEye from '../../assets/images/icons/FilteredEyeAndMaskFour.svg'
import transparentEye from '../../assets/images/icons/TransparentEye.svg'
import './VisualEye.scss'
import { Component } from 'react'


class VisualEye extends Component {

    state = {
        playing: this.props.playing
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.playing !== this.props.playing) {
            this.setState({
                playing: this.props.playing
            })
        }
    }

    render() {
        return (
            <div className="visual-eye">
                <img src={spiral} alt="spiral" className={`visual-eye__spiral ${this.state.playing ? 'visual-eye__spiral--active' : ''}`}/>
                <img src={visualEye} alt="visual-eye" className="visual-eye__eye" />
                <img src={transparentEye} alt="visual-eye" className={`visual-eye__transparent-eye ${this.state.playing ? 'visual-eye__transparent-eye--active' : "" }`} />
                <img src={transparentEye} alt="visual-eye" className={`visual-eye__transparent-eye-pulse ${this.state.playing ? 'visual-eye__transparent-eye-pulse--active' : ""}`} />
            </div>
        );
    }
}

export default VisualEye;