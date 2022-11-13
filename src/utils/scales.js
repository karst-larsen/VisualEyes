const scalesLibrary = (index) => {
  const scalesList = {
    1: ["C3", "D3", "D#3", "F3", "G3", "G#3", "A#3", "C4"],
    0: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
  };
  console.log(scalesList[0]);
  return scalesList[index];
};

const scales = {
  cMaj: ["C3", "D3", "E3", "F3", "G3", "A3", "B3", "C4"],
  cMin: ["C3", "D3", "D#3", "F3", "G3", "G#3", "A#3", "C4"],
};

const scaleConverter = (scale, scaleIndex) => {
  return scale[`${scaleIndex}`];
};

export { scales, scaleConverter, scalesLibrary };
