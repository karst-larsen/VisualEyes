import spiral from '../../assets/images/icons/Spiral.svg'
import visualEye from '../../assets/images/icons/FilteredEyeAndMaskFour.svg'
import transparentEye from '../../assets/images/icons/TransparentEye.svg'
import './VisualEye.scss'


function VisualEye({steps, playing, timeNode, openHatArray})  {

    // state = {
    //     playing: this.props.playing
    // }

    // componentDidUpdate(prevProps, prevState){
    //     if (prevProps.playing !== this.props.playing) {
    //         this.setState({
    //             playing: this.props.playing
    //         })
    //     }
    // }

    let hatContainer = []

    for (let i = 0; i < openHatArray.length; i++) {
        if (openHatArray[i] !== null) {
            let newStep = {
                id: i
            }
            hatContainer.push(newStep)
        } else {
            hatContainer.push(null)
        }
    }

    let filteredHatContainer = hatContainer.filter(step => {
        return step !== null;
    })


    let testContainer = []

    for (let i = 0; i < steps.length; i++) {
        if (steps[i] !== null) {
            let newNote = {
                id: i
            }
            testContainer.push(newNote)
        } else {
            testContainer.push(null)
        }
    }

    let filteredContainer = testContainer.filter(steps => {
        return steps !== null
    })

    console.log(timeNode)




    return (
        <div className={`visual-eye ${testContainer[timeNode]?.id === timeNode ? 'visual-eye--active' : 'visual-eye--inactive'}`}>
            <img src={spiral} alt="spiral" className={`visual-eye__spiral ${hatContainer[timeNode]?.id === timeNode ? 'visual-eye__spiral--active' : 'visual-eye__spiral--inactive'}`}/>
            <img src={visualEye} alt="visual-eye" className={`visual-eye__eye`} />
            <img src={transparentEye} alt="visual-eye" className={`visual-eye__transparent-eye ${playing ? 'visual-eye__transparent-eye--active' : ''}`} />
            <img src={transparentEye} alt="visual-eye" className={`visual-eye__transparent-eye-pulse ${testContainer[timeNode]?.id === timeNode ? 'visual-eye__transparent-eye-pulse--active' : 'visual-eye__transparent-eye-pulse--inactive'}`} />
        </div>
    );
}

export default VisualEye;