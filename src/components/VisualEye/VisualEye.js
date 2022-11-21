import spiralInvert from "../../assets/images/icons/CircularSpiral-white.svg";
import spiral from "../../assets/images/icons/CircularSpiral.svg";
import visualEye from "../../assets/images/icons/VisualEye-LidMask.png";
import visualEyeInvert from "../../assets/images/icons/VisualEye-LidMask-invert.png";
import transparentEye from "../../assets/images/icons/visualeyes-pump.png";
import transparentEyeInvert from "../../assets/images/icons/visualeyes-pump-invert.png";
import "./VisualEye.scss";

function VisualEye({
  darkMode,
  steps,
  playing,
  timeNode,
  hiHatArray,
  claps,
  openHatArray,
}) {
  //Pushes filtered notes into hatContainer to show visual effects on selected nodes

  const openHatContainer = [];

  for (let i = 0; i < openHatArray.length; i++) {
    if (openHatArray[i] !== null) {
      let newStep = {
        id: i,
      };
      openHatContainer.push(newStep);
    } else {
      openHatContainer.push(null);
    }
  }

  let hatContainer = [];

  for (let i = 0; i < hiHatArray.length; i++) {
    if (hiHatArray[i] !== null) {
      let newStep = {
        id: i,
      };
      hatContainer.push(newStep);
    } else {
      hatContainer.push(null);
    }
  }

  let testContainer = [];

  for (let i = 0; i < steps.length; i++) {
    if (steps[i] !== null) {
      let newNote = {
        id: i,
      };
      testContainer.push(newNote);
    } else {
      testContainer.push(null);
    }
  }

  let clapContainer = [];

  for (let i = 0; i < claps.length; i++) {
    if (claps[i] !== null) {
      let newNote = {
        id: i,
      };
      clapContainer.push(newNote);
    } else {
      clapContainer.push(null);
    }
  }

  return (
    <div
      className={`visual-eye ${
        testContainer[timeNode]?.id === timeNode
          ? "visual-eye--active"
          : "visual-eye--inactive"
      }`}
    >
      <img
        src={darkMode ? spiralInvert : spiral}
        alt="spiral"
        className={`visual-eye__spiral ${
          hatContainer[timeNode]?.id === timeNode
            ? "visual-eye__spiral--active"
            : ""
        }`}
      />
      <img
        src={darkMode ? visualEyeInvert : visualEye}
        alt="visual-eye"
        className={`visual-eye__eye`}
      />
      <img
        src={transparentEye}
        alt="visual-eye"
        className={`visual-eye__transparent-eye ${
          playing ? "visual-eye__transparent-eye--active" : ""
        } ${
          openHatContainer[timeNode]?.id === timeNode
            ? "visual-eye__transparent-eye--active-note"
            : ""
        }`}
      />
      <img
        src={darkMode ? transparentEyeInvert : transparentEye}
        alt="visual-eye"
        className={`visual-eye__transparent-eye-pulse ${
          clapContainer[timeNode]?.id === timeNode
            ? "visual-eye__transparent-eye-pulse--active"
            : "visual-eye__transparent-eye-pulse--inactive"
        }`}
      />
    </div>
  );
}

export default VisualEye;
