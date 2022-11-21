const leadSynthNotes = (scale) => {
  let synthSequencer = [];
  let leadScale =
    scale?.length > 0
      ? scale
      : ["C3", "D3", "D#3", "F3", "G3", "G#3", "A#3", "C4"];

  for (let i = 0; i < 32; i++) {
    let synthColumn = [];
    for (let j = 0; j < 8; j++) {
      let synthObj = {
        id: j,
        note: leadScale[j],
        isActive: false,
      };
      synthColumn.push(synthObj);
    }
    synthSequencer.push([synthColumn]);
  }

  return synthSequencer;
};

const bassSynthNotes = () => {
  let synthSequencer = [];
  let leadScale = ["C2", "D2", "D#2", "F2", "G2", "G#2", "A#2", "C3"];

  for (let i = 0; i < 32; i++) {
    let synthColumn = [];
    for (let j = 0; j < 8; j++) {
      let synthObj = {
        id: j,
        note: leadScale[j],
        isActive: false,
      };
      synthColumn.push(synthObj);
    }
    synthSequencer.push([synthColumn]);
  }

  return synthSequencer;
};

export { leadSynthNotes, bassSynthNotes };
