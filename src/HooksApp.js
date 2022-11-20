import "./App.scss";
import { useState, useEffect } from "react";
import * as Tone from "tone";
import VisualEye from "./components/VisualEye/VisualEye";
import LeftSixth from "./components/LeftSixth/LeftSixth";
import RightSixth from "./components/RightSixth/RightSixth";
import Squares from "./components/Squares/Squares";
import { synthOne, synthTwo } from "./utils/Synths";
import { sequenceTimer } from "./utils/SequenceTimer";
import { leadSynthNotes, bassSynthNotes } from "./utils/SynthOneNotes";
import { allDrumSequencer } from "./components/DrumSequencer/DrumSequencer";
import playButton from "./assets/images/icons/play-button.svg";
import stopButton from "./assets/images/icons/stop-button.svg";
import kickSound from "./assets/sounds/kick/kick (16).wav";
import clapSound from "./assets/sounds/clap/clap(1).wav";
import hiHatSound from "./assets/sounds/hihat/hihat(1).WAV";
import openHatSound from "./assets/sounds/openhat/hi hat (36).wav";
import SequenceList from "./components/SequenceList/SequenceList";
import visualEyesLogo from "./assets/images/icons/spectrumVisualEyes.png";
import { scales, scalesLibrary } from "./utils/scales";
import SynthSequencer from "./components/SynthSequencer/SynthSequencer";

function HooksApp() {
  const drumSampler = new Tone.Players({
    kick: kickSound,
    clap: clapSound,
    hiHat: hiHatSound,
    openHat: openHatSound,
  }).toDestination();

  const kickSequence = new Tone.Sequence(
    (time, note) => {
      drumSampler.player(note).start(time);
    },
    [],
    "16n"
  );

  const clapSequence = new Tone.Sequence(
    (time, note) => {
      drumSampler.player(note).start(time);
    },
    [],
    "16n"
  );

  const hiHatSequence = new Tone.Sequence(
    (time, note) => {
      drumSampler.player(note).start(time);
    },
    [],
    "16n"
  );

  const openHatSequence = new Tone.Sequence(
    (time, note) => {
      drumSampler.player(note).start(time);
    },
    [],
    "16n"
  );
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [timerArray, setTimeraArray] = useState(new Array(32).fill(null));
  const [leadSynthArray, setLeadSynthArray] = useState([
    new Array(32).fill(null),
    new Array(32).fill(null),
    new Array(32).fill(null),
    new Array(32).fill(null),
  ]);
  const [bassSynthArray, setBassSynthArray] = useState([
    new Array(32).fill(null),
    new Array(32).fill(null),
    new Array(32).fill(null),
    new Array(32).fill(null),
  ]);
  const [drumArray, setDrumArray] = useState([
    [
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
    ],
    [
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
    ],
    [
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
    ],
    [
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
      new Array(32).fill(null),
    ],
  ]);
  const [sequenceOne, setSequenceOne] = useState(
    new Tone.Sequence(
      (time, note) => {
        synthOne.triggerAttackRelease(note, 0.1, time);
      },
      [],
      "16n"
    )
  );
  const [sequenceTwo, setSequenceTwo] = useState(
    new Tone.Sequence(
      (time, note) => {
        synthTwo.triggerAttackRelease(note, 0.1, time);
      },
      [],
      "16n"
    )
  );
  const [sequences, setSequences] = useState({
    leadSynthSequencer: [
      leadSynthNotes(scalesLibrary(1)),
      leadSynthNotes(scalesLibrary(1)),
      leadSynthNotes(scalesLibrary(1)),
      leadSynthNotes(scalesLibrary(1)),
    ],
    bassSynthSequencer: [
      bassSynthNotes(scalesLibrary(1)),
      bassSynthNotes(scalesLibrary(1)),
      bassSynthNotes(scalesLibrary(1)),
      bassSynthNotes(scalesLibrary(1)),
    ],
    allDrumSequencer: JSON.parse(localStorage.getItem("allDrumSequencer")) || [
      allDrumSequencer(),
      allDrumSequencer(),
      allDrumSequencer(),
      allDrumSequencer(),
    ],
  });
  const [sequenceTimer, setSequenceTimer] = useState(sequenceTimer());
  const [isActive, setIsActive] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [selectedTimeNode, setSelectedTimeNode] = useState(null);
  const [synthOneOscillator, setSynthOneOscillator] = useState("sawtooth");
  const [synthOneADSR, setSynthOneADSR] = useState({
    attack: 0,
    decay: 0.5,
    sustain: 0.5,
    release: 1,
  });
  const [synthTwoOscillator, setSynthTwoOscillator] = useState("sawtooth");
  const [synthTwoADSR, setSynthTwoADSR] = useState({
    attack: 0,
    decay: 0.5,
    sustain: 0.5,
    release: 1,
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [sequenceButtons, setSequenceButtons] = useState([
    {
      sequence: 0,
      name: "sequenceOne",
      buttons: [
        {
          id: 0,
          name: "A",
          isActive: true,
        },
        {
          id: 1,
          name: "B",
          isActive: false,
        },
        {
          id: 2,
          name: "C",
          isActive: false,
        },
        {
          id: 3,
          name: "D",
          isActive: false,
        },
      ],
    },
    {
      sequence: 1,
      name: "sequenceTwo",
      buttons: [
        {
          id: 0,
          name: "A",
          isActive: true,
        },
        {
          id: 1,
          name: "B",
          isActive: false,
        },
        {
          id: 2,
          name: "C",
          isActive: false,
        },
        {
          id: 3,
          name: "D",
          isActive: false,
        },
      ],
    },
    {
      sequence: 2,
      name: "sequenceThree",
      buttons: [
        {
          id: 0,
          name: "A",
          isActive: true,
        },
        {
          id: 1,
          name: "B",
          isActive: false,
        },
        {
          id: 2,
          name: "C",
          isActive: false,
        },
        {
          id: 3,
          name: "D",
          isActive: false,
        },
      ],
    },
  ]);
  const [activeSequence, setActiveSequence] = useState({
    activeLeadSequence: 0,
    activeBassSequence: 0,
    activeDrumSequence: 0,
  });
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //     this.state = {
  //       playing: false,
  //       started: false,
  //       timerArray: new Array(32).fill(null),
  //       leadSynthArray: [
  //         new Array(32).fill(null),
  //         new Array(32).fill(null),
  //         new Array(32).fill(null),
  //         new Array(32).fill(null),
  //       ],
  //       bassSynthArray: [
  //         new Array(32).fill(null),
  //         new Array(32).fill(null),
  //         new Array(32).fill(null),
  //         new Array(32).fill(null),
  //       ],
  //       drumArray: JSON.parse(localStorage.getItem("drumArray")) || [
  //         [
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //         ],
  //         [
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //         ],
  //         [
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //         ],
  //         [
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //           new Array(32).fill(null),
  //         ],
  //       ],
  //       sequenceOne: new Tone.Sequence(
  //         (time, note) => {
  //           synthOne.triggerAttackRelease(note, 0.1, time);
  //         },
  //         [],
  //         "16n"
  //       ),
  //       sequenceTwo: new Tone.Sequence(
  //         (time, note) => {
  //           synthTwo.triggerAttackRelease(note, 0.1, time);
  //         },
  //         [],
  //         "16n"
  //       ),
  //       kickSequence,
  //       clapSequence,
  //       hiHatSequence,
  //       openHatSequence,
  //       sequences: {
  //         leadSynthSequencer: [
  //           leadSynthNotes(scalesLibrary(1)),
  //           leadSynthNotes(scalesLibrary(1)),
  //           leadSynthNotes(scalesLibrary(1)),
  //           leadSynthNotes(scalesLibrary(1)),
  //         ],
  //         bassSynthSequencer: [
  //           bassSynthNotes(scalesLibrary(1)),
  //           bassSynthNotes(scalesLibrary(1)),
  //           bassSynthNotes(scalesLibrary(1)),
  //           bassSynthNotes(scalesLibrary(1)),
  //         ],
  //         allDrumSequencer: JSON.parse(
  //           localStorage.getItem("allDrumSequencer")
  //         ) || [
  //           allDrumSequencer(),
  //           allDrumSequencer(),
  //           allDrumSequencer(),
  //           allDrumSequencer(),
  //         ],
  //       },
  //       sequenceTimer: sequenceTimer(),
  //       drumSampler,
  //       isActive: false,
  //       tempo: 120,
  //       selectedTimeNode: null,
  //       synthOneOscillator: {
  //         type: "sawtooth",
  //       },
  //       synthOneADSR: {
  //         attack: 0,
  //         decay: 0.5,
  //         sustain: 0.5,
  //         release: 1,
  //       },
  //       synthTwoOscillator: {
  //         type: "sawtooth",
  //       },
  //       synthTwoADSR: {
  //         attack: 0,
  //         decay: 0.5,
  //         sustain: 0.5,
  //         release: 1,
  //       },
  //       isSettingsOpen: false,
  //       sequenceButtons: [
  //         {
  //           sequence: 0,
  //           name: "sequenceOne",
  //           buttons: [
  //             {
  //               id: 0,
  //               name: "A",
  //               isActive: true,
  //             },
  //             {
  //               id: 1,
  //               name: "B",
  //               isActive: false,
  //             },
  //             {
  //               id: 2,
  //               name: "C",
  //               isActive: false,
  //             },
  //             {
  //               id: 3,
  //               name: "D",
  //               isActive: false,
  //             },
  //           ],
  //         },
  //         {
  //           sequence: 1,
  //           name: "sequenceTwo",
  //           buttons: [
  //             {
  //               id: 0,
  //               name: "A",
  //               isActive: true,
  //             },
  //             {
  //               id: 1,
  //               name: "B",
  //               isActive: false,
  //             },
  //             {
  //               id: 2,
  //               name: "C",
  //               isActive: false,
  //             },
  //             {
  //               id: 3,
  //               name: "D",
  //               isActive: false,
  //             },
  //           ],
  //         },
  //         {
  //           sequence: 2,
  //           name: "sequenceThree",
  //           buttons: [
  //             {
  //               id: 0,
  //               name: "A",
  //               isActive: true,
  //             },
  //             {
  //               id: 1,
  //               name: "B",
  //               isActive: false,
  //             },
  //             {
  //               id: 2,
  //               name: "C",
  //               isActive: false,
  //             },
  //             {
  //               id: 3,
  //               name: "D",
  //               isActive: false,
  //             },
  //           ],
  //         },
  //       ],
  //       activeSequence: {
  //         activeLeadSequence: 0,
  //         activeBassSequence: 0,
  //         activeDrumSequence: 0,
  //       },
  //       darkMode: false,
  //       menuOpen: true,
  //     };
  //   }

  //function to set the sequence button to active

  const handleActiveButton = (buttonId, button, sequenceObject) => {
    //Only update the sequenceButton that matches the correct sequence
    const sequenceId = sequenceObject.sequence;
    const newArray = [...sequenceButtons];
    const newActiveButton = newArray[sequenceId].buttons.find(
      (button) => button.id === buttonId
    );
    newArray[sequenceId].buttons.forEach((button) => (button.isActive = false));
    newActiveButton.isActive = true;

    if (sequenceId === 0) {
      setSequenceButtons(newArray);
      setActiveSequence(
        {
          ...activeSequence,
          activeLeadSequence: buttonId,
        },
        () => {
          sequenceOne.set({
            events: leadSynthArray[activeSequence.activeLeadSequence],
          });
        }
      );
    } else if (sequenceId === 1) {
      setSequenceButtons(newArray);
      setActiveSequence(
        {
          ...activeSequence,
          activeBassSequence: buttonId,
        },
        () => {
          sequenceTwo.set({
            events: bassSynthArray[activeSequence.activeBassSequence],
          });
        }
      );
    } else if (sequenceId === 2) {
      setSequenceButtons(newArray);
      setActiveSequence(
        {
          ...activeSequence,
          activeDrumSequence: buttonId,
        },
        () => {
          kickSequence.set({
            events: drumArray[activeSequence.activeDrumSequence][0],
          });
          clapSequence.set({
            events: drumArray[activeSequence.activeDrumSequence][1],
          });
          hiHatSequence.set({
            events: drumArray[activeSequence.activeDrumSequence][2],
          });
          openHatSequence.set({
            events: drumArray[activeSequence.activeDrumSequence][3],
          });
        }
      );
    }
  };

  //dark mode toggle
  const changeDarkMode = () => {
    setDarkMode(!darkMode);
  };

  //Toggle menu

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  //Clock for selecting index of 32 steps
  const timerSequence = () => {
    Tone.Transport.scheduleRepeat((time) => {
      setSelectedTimeNode(Tone.Transport.getTicksAtTime(time) / 48);
    }, "16n");
  };

  //Changes node colour based on user select
  const handleNoteClick = (note, column) => {
    column.forEach(() => {
      setIsActive(false);
    });

    note.isActive = !note.isActive;
    setIsActive(note.isActive);
  };

  //Starts loop sequence
  const startLoop = (sequence) => {
    sequence.start();
  };

  const configLoop = () => {
    sequenceOne.set({
      events: leadSynthArray[activeSequence.activeLeadSequence],
    });

    sequenceTwo.set({
      events: bassSynthArray[activeSequence.activeBassSequence],
    });

    sequenceOne.start();
    sequenceTwo.start();
    kickSequence.start();
    clapSequence.start();
    hiHatSequence.start();
    openHatSequence.start();

    Tone.Transport.bpm.value = tempo;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = "2:0:0";
    Tone.Transport.start();

    timerSequence();
  };

  const configPlayButton = () => {
    if (!started) {
      Tone.start().then(() => {
        Tone.getDestination();
        configLoop();
        setStarted(true);
        setPlaying(true);
      });
    }
  };

  const stopPlay = () => {
    Tone.Transport.stop();
    setStarted(false);
    setPlaying(false);
  };

  const handleUpdatedDrumSequence = (sequenceId, sequence, noteId, note) => {
    //Spread the array of all the drum sequences
    const sequences = [...drumArray];
    //Retrieve the copied array to be manipulated

    sequences[activeSequence.activeDrumSequence][sequenceId][noteId] =
      sequences[activeSequence.activeDrumSequence][sequenceId][noteId]
        ? null
        : note.note;
    note.isActive = !note.isActive;

    if (sequenceId === 0) {
      setDrumArray(sequences);

      kickSequence.set({
        events: sequences[activeSequence.activeDrumSequence][sequenceId],
      });
    } else if (sequenceId === 1) {
      setDrumArray(sequences);

      kickSequence.set({
        events: sequences[activeSequence.activeDrumSequence][sequenceId],
      });
    } else if (sequenceId === 2) {
      setDrumArray(sequences);

      kickSequence.set({
        events: sequences[activeSequence.activeDrumSequence[sequenceId]],
      });
    } else if (sequenceId === 3) {
      setDrumArray(sequences);

      kickSequence.set({
        events: sequences[activeSequence.activeDrumSequence[sequenceId]],
      });
    }

    // localStorage.setItem(
    //   "allDrumSequencer",
    //   JSON.stringify(this.state.sequences.allDrumSequencer)
    // );

    // localStorage.setItem("drumArray", JSON.stringify(this.state.drumArray));
  };

  const leadArrayMelody = (e, column, columnId, noteArrayId, note) => {
    let updatedLeadArray = [...leadSynthArray];

    if (note.isActive) {
      updatedLeadArray[activeSequence.activeLeadSequence][columnId] = null;
    } else {
      column.forEach((columnItem) => {
        columnItem.forEach((note) => {
          note.isActive = false;
        });
      });
      updatedLeadArray[activeSequence.activeLeadSequence][columnId] = note.note;
    }

    setLeadSynthArray(updatedLeadArray);

    sequenceOne.set({
      events: leadSynthArray[activeSequence.activeLeadSequence],
    });

    handleNoteClick(note, column);
  };

  const bassArrayMelody = (e, column, columnId, noteArrayId, note) => {
    let updatedBassArray = [...bassSynthArray];

    if (note.isActive) {
      updatedBassArray[activeSequence.activeBassSequence][columnId] = null;
    } else {
      column.forEach((columnItem) => {
        columnItem.forEach((note) => {
          note.isActive = false;
        });
      });
      updatedBassArray[activeSequence.activeBassSequence][columnId] = note.note;
    }

    setBassSynthArray(updatedBassArray);

    sequenceTwo.set(
      {
        events: bassSynthArray[activeSequence.activeBassSequence],
      },
      [bassSynthArray[activeSequence.activeBassSequence]]
    );

    handleNoteClick(note, column);
  };

  const playArray = () => {
    sequenceOne.set({
      events: leadSynthArray[activeSequence.activeLeadSequence],
    });
    sequenceTwo.set({
      events: bassSynthArray[activeSequence.activeBassSequence],
    });
  };

  const changeTempo = (e) => {
    setTempo(e.target.value);

    Tone.Transport.bpm.value = tempo;
  };

  const editEnvelope = (e, synth) => {
    if (synth === "synthOne") {
      const updatedSynthOneADSR = {
        ...synthOneADSR,
      };

      updatedSynthOneADSR[e.target.name] = Number(e.target.value);

      setSynthOneADSR(updatedSynthOneADSR);
    } else if (synth === "synthTwo") {
      const updatedSynthTwoADSR = {
        ...synthTwoADSR,
      };

      updatedSynthTwoADSR[e.target.name] = Number(e.target.value);

      setSynthTwoADSR(updatedSynthTwoADSR);
    }
  };

  const openSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleScaleChange = (e) => {};

  //Update the type of oscillator used
  const changeOscillator = (type) => {
    const updatedOscillator = {
      type: `${type}`,
    };
    setSynthOneOscillator(updatedOscillator);

    synthOne.set({
      oscillator: synthOneOscillator,
    });
  };

  //     const loadActiveNotes = (drumArray, array2, array3) => {
  //     const activeDrumArray =
  //       drumArray[0][this.state.activeSequence.activeDrumSequence];
  //   };

  synthOne.set({
    oscillator: synthOneOscillator,
    envelope: synthOneADSR,
  });

  synthTwo.set({
    oscillator: synthTwoOscillator,
    envelope: synthTwoADSR,
  });

  return (
    <div className="App">
      <header
        className={`App-header ${darkMode ? "App-header--dark-mode" : ""}`}
      >
        <img
          src={playButton}
          alt="play button"
          className="App-header__button"
          onMouseDown={configPlayButton}
        />
        <img
          src={stopButton}
          alt="stop button"
          className="App-header__button"
          onMouseDown={stopPlay}
        />
        <div className="App-header__right-nav">
          <div
            className={`dark-toggle ${darkMode ? "dark-toggle--active" : ""}`}
            onClick={() => changeDarkMode()}
          >
            <div
              className={`dark-toggle__selector ${
                darkMode ? "dark-toggle__selector--dark-mode" : ""
              }`}
            ></div>
          </div>
          <img
            src={visualEyesLogo}
            className="App-header__logo"
            alt="VisualEyes Logo"
          />
        </div>
        <div className="App-header__tempo-box">
          <span className="App-header__tempo">Tempo: {tempo}</span>{" "}
          <input
            className="App-header__tempo-range"
            type="range"
            min="60"
            max="180"
            value={tempo}
            onChange={(e) => changeTempo(e)}
          />
        </div>
      </header>
      <section className={`visual-container`}>
        <div
          className={`visual-container__middle ${
            darkMode ? "visual-container__middle--dark-mode" : ""
          }`}
        >
          {menuOpen ? (
            <SynthSequencer
              timer={sequenceTimer}
              timeNode={selectedTimeNode}
              synthSequence={sequences.leadSynthSequencer}
              envelopes={synthOneADSR}
              activeSequence={activeSequence.activeLeadSequence}
              darkMode={darkMode}
              arrayMelody={leadArrayMelody}
              editEnvelope={editEnvelope}
              scaleChange={handleScaleChange}
              synth="synthOne"
            />
          ) : (
            <LeftSixth
              darkMode={darkMode}
              notes={leadSynthArray[activeSequence.activeLeadSequence]}
              timeNode={selectedTimeNode}
              leadRelease={synthOneADSR.release}
              leadAttack={synthOneADSR.attack}
            />
          )}

          <div className="visual-container__hihats-eye">
            <ul className="sequencer__time">
              {sequenceTimer.map((timer, timerIndex) => {
                return (
                  <li
                    key={timerIndex}
                    className={`sequencer__time-node ${
                      selectedTimeNode === timerIndex
                        ? "sequencer__time-node--selected"
                        : ""
                    }`}
                  >
                    {timer}
                  </li>
                );
              })}
            </ul>
            <VisualEye
              darkMode={darkMode}
              playing={playing}
              steps={drumArray[activeSequence.activeDrumSequence][0]}
              claps={drumArray[activeSequence.activeDrumSequence][1]}
              timeNode={selectedTimeNode}
              hiHatArray={drumArray[activeSequence.activeDrumSequence][2]}
            />
            <div className="visual-container__sequence-selection">
              <SequenceList
                sequences={sequenceButtons}
                handleActiveButton={handleActiveButton}
              />
            </div>
            <button
              className="visual-container__menu-button"
              onClick={() => handleMenu()}
            >
              Menu
            </button>
          </div>
          {menuOpen ? (
            <SynthSequencer
              timer={sequenceTimer}
              timeNode={selectedTimeNode}
              synthSequence={sequences.bassSynthSequencer}
              envelopes={synthTwoADSR}
              activeSequence={activeSequence.activeBassSequence}
              darkMode={darkMode}
              arrayMelody={bassArrayMelody}
              editEnvelope={editEnvelope}
              scaleChange={handleScaleChange}
              synth="synthTwo"
            />
          ) : (
            <RightSixth
              darkMode={darkMode}
              notes={leadSynthArray[activeSequence.activeLeadSequence]}
              timeNode={selectedTimeNode}
              leadRelease={synthOneADSR.release}
              leadAttack={synthOneADSR.attack}
            />
          )}
        </div>

        <div
          className={`visual-container__bottom ${
            darkMode ? "visual-container__bottom--dark-mode" : ""
          }`}
        >
          {menuOpen ? (
            <section className="sequencer">
              {sequences.allDrumSequencer[
                activeSequence.activeDrumSequence
              ].map((sequence, sequenceId) => {
                return (
                  <ul className="sequencer__drum-map" key={sequenceId}>
                    {sequence.map((note, noteId) => {
                      return (
                        <li
                          key={noteId}
                          className={`sequencer__note ${
                            darkMode ? "sequencer__note--dark-mode" : ""
                          }${note.isActive ? "sequencer__note--active" : ""} ${
                            selectedTimeNode === noteId
                              ? "sequencer__note--selected"
                              : ""
                          }`}
                          onClick={() =>
                            handleUpdatedDrumSequence(
                              sequenceId,
                              sequence,
                              noteId,
                              note
                            )
                          }
                        >
                          •
                        </li>
                      );
                    })}
                  </ul>
                );
              })}
            </section>
          ) : (
            <Squares
              darkMode={darkMode}
              notes={bassSynthArray[activeSequence.activeBassSequence]}
              timeNode={selectedTimeNode}
              bassRelease={synthTwoADSR.release}
              bassAttack={synthTwoADSR.attack}
            />
          )}
        </div>
      </section>
      <div className="footer">
        <span className="footer__logo">VisualEyes</span>
      </div>
    </div>
  );
}

export default HooksApp;
