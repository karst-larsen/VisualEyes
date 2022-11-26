const allDrumSequencer = () => {
  const drumSequencer = [];
  const drumSounds = ["kick", "clap", "hiHat", "openHat"];

  for (let i = 0; i < 4; i++) {
    const drumRow = [];
    for (let j = 0; j < 32; j++) {
      let drumObj = {
        id: j,
        note: drumSounds[i],
        isActive: false,
      };
      drumRow.push(drumObj);
    }
    drumSequencer.push(drumRow);
  }

  return drumSequencer;
};

export { allDrumSequencer };
