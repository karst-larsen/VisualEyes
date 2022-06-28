import spiral from '../../src/assets/images/icons/Spiral.svg'
import visualEye from '../../src/assets/images/icons/FilteredEyeAndMaskFour.svg'
import transparentEye from '../../src/assets/images/icons/TransparentEye.svg'
import './VisualEye.scss'

function VisualEye() {
    return (
        <div className="visual-eye">
            <img src={spiral} alt="spiral" className="visual-eye__spiral"/>
            <img src={visualEye} alt="visual-eye" className="visual-eye__eye" />
            {/* <img src={transparentEye} alt="visual-eye" className="visual-eye__transparent-eye" />
            <img src={transparentEye} alt="visual-eye" className="visual-eye__transparent-eye--two" /> */}
        </div>
    );
}

export default VisualEye;