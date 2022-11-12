import "./App.scss";
import { Component } from "react";
import * as Tone from "tone";
import VisualEye from "./components/VisualEye/VisualEye";
import LeftSixth from "./components/LeftSixth/LeftSixth";
import RightSixth from "./components/RightSixth/RightSixth";
import Squares from "./components/Squares/Squares";
import { synthOne, synthTwo } from "./utils/Synths";
import { sequenceTimer } from "./utils/SequenceTimer";
import { leadSynthNotes, bassSynthNotes } from "./utils/SynthOneNotes";
import {
  drumSequencer,
  clapSequencer,
  hiHatSequencer,
  openHatSequencer,
  allDrumSequencer,
} from "./components/DrumSequencer/DrumSequencer";
import pianoIcon from "./assets/images/icons/octavePiano.svg";
import playButton from "./assets/images/icons/play-button.svg";
import stopButton from "./assets/images/icons/stop-button.svg";
import kickSound from "./assets/sounds/kick/kick (16).wav";
import clapSound from "./assets/sounds/clap/clap(1).wav";
import hiHatSound from "./assets/sounds/hihat/hihat(1).WAV";
import openHatSound from "./assets/sounds/openhat/hi hat (36).wav";
import kickIcon from "./assets/images/icons/Kick.svg";
import clapIcon from "./assets/images/icons/Clap.svg";
import hiHatIcon from "./assets/images/icons/HiHat.svg";
import openHatIcon from "./assets/images/icons/OpenHat.svg";
import SequenceList from "./components/SequenceList/SequenceList";
import visualEyesLogo from "./assets/images/icons/spectrumVisualEyes.png";
// import { controllers } from "dat.gui";

class App extends Component {
  constructor() {
    super();

    const drumSampler = new Tone.Players({
      kick: kickSound,
      clap: clapSound,
      hiHat: hiHatSound,
      openHat: openHatSound,
    }).toDestination();

    const kickSequence = new Tone.Sequence(
      (time, note) => {
        this.state.drumSampler.player(note).start(time);
      },
      [],
      "16n"
    );

    const clapSequence = new Tone.Sequence(
      (time, note) => {
        this.state.drumSampler.player(note).start(time);
      },
      [],
      "16n"
    );

    const hiHatSequence = new Tone.Sequence(
      (time, note) => {
        this.state.drumSampler.player(note).start(time);
      },
      [],
      "16n"
    );

    const openHatSequence = new Tone.Sequence(
      (time, note) => {
        this.state.drumSampler.player(note).start(time);
      },
      [],
      "16n"
    );

    this.state = {
      playing: false,
      started: false,
      timerArray: new Array(32).fill(null),
      leadSynthArray: [
        new Array(32).fill(null),
        new Array(32).fill(null),
        new Array(32).fill(null),
        new Array(32).fill(null),
      ],
      bassSynthArray: [
        new Array(32).fill(null),
        new Array(32).fill(null),
        new Array(32).fill(null),
        new Array(32).fill(null),
      ],
      drumArray: [
        new Array(32).fill(null),
        new Array(32).fill(null),
        new Array(32).fill(null),
        new Array(32).fill(null),
      ],
      sequenceOne: new Tone.Sequence(
        (time, note) => {
          synthOne.triggerAttackRelease(note, 0.1, time);
        },
        [],
        "16n"
      ),
      sequenceTwo: new Tone.Sequence(
        (time, note) => {
          synthTwo.triggerAttackRelease(note, 0.1, time);
        },
        [],
        "16n"
      ),
      kickSequence,
      clapSequence,
      hiHatSequence,
      openHatSequence,
      sequences: {
        leadSynthSequencer: [
          leadSynthNotes(),
          leadSynthNotes(),
          leadSynthNotes(),
          leadSynthNotes(),
        ],
        bassSynthSequencer: [
          bassSynthNotes(),
          bassSynthNotes(),
          bassSynthNotes(),
          bassSynthNotes(),
        ],
        allDrumSequencer: allDrumSequencer(),
      },
      sequenceTimer: sequenceTimer(),
      drumSampler,
      isActive: false,
      tempo: 120,
      selectedTimeNode: null,
      synthOneOscillator: {
        type: "sawtooth",
      },
      synthOneADSR: {
        attack: 0,
        decay: 0.5,
        sustain: 0.5,
        release: 1,
      },
      synthTwoOscillator: {
        type: "sawtooth",
      },
      synthTwoADSR: {
        attack: 0,
        decay: 0.5,
        sustain: 0.5,
        release: 1,
      },
      isSettingsOpen: false,
      sequenceButtons: [
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
      ],
      activeSequence: {
        activeLeadSequence: 0,
        activeBassSequence: 0,
        activeDrumSequence: 0,
      },
      darkMode: false,
      menuOpen: true,
    };
  }

  //function to set the sequence button to active

  handleActiveButton = (buttonId, button, sequenceObject) => {
    //Only update the sequenceButton that matches the correct sequence
    const newArray = [...this.state.sequenceButtons];
    const sequenceId = sequenceObject.sequence;
    const newActiveButton = newArray[sequenceId].buttons.find(
      (button) => button.id === buttonId
    );
    newArray[sequenceId].buttons.forEach((button) => (button.isActive = false));
    newActiveButton.isActive = true;

    if (sequenceId === 0) {
      this.setState(
        {
          sequenceButtons: newArray,
          activeSequence: {
            ...this.state.activeSequence,
            activeLeadSequence: buttonId,
          },
        },
        () => {
          this.state.sequenceOne.set({
            events:
              this.state.leadSynthArray[
                this.state.activeSequence.activeLeadSequence
              ],
          });
        }
      );
    } else if (sequenceId === 1) {
      this.setState(
        {
          sequenceButtons: newArray,
          activeSequence: {
            ...this.state.activeSequence,
            activeBassSequence: buttonId,
          },
        },
        () => {
          this.state.sequenceTwo.set({
            events:
              this.state.bassSynthArray[
                this.state.activeSequence.activeBassSequence
              ],
          });
        }
      );
    }
  };

  //dark mode toggle
  changeDarkMode = () => {
    this.setState({
      darkMode: !this.state.darkMode,
    });
  };

  //Toggle menu

  handleMenu = () => {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
  };

  //Clock for selecting index of 32 steps
  timerSequence = () => {
    Tone.Transport.scheduleRepeat((time) => {
      this.setState({
        selectedTimeNode: Tone.Transport.getTicksAtTime(time) / 48,
      });
    }, "16n");
  };

  //Changes node colour based on user select
  handleNoteClick = (note, column) => {
    column.forEach(() => {
      this.setState({
        isActive: false,
      });
    });

    note.isActive = !note.isActive;
    this.setState({
      isActive: note.isActive,
    });
  };

  //Starts loop sequence
  startLoop = (sequence) => {
    sequence.start();
  };

  configLoop = () => {
    this.state.sequenceOne.set({
      events:
        this.state.leadSynthArray[this.state.activeSequence.activeLeadSequence],
    });

    this.state.sequenceTwo.set({
      events:
        this.state.bassSynthArray[this.state.activeSequence.activeBassSequence],
    });

    this.state.sequenceOne.start();
    this.state.sequenceTwo.start();
    this.state.kickSequence.start();
    this.state.clapSequence.start();
    this.state.hiHatSequence.start();
    this.state.openHatSequence.start();

    Tone.Transport.bpm.value = this.state.tempo;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = "2:0:0";
    Tone.Transport.start();

    this.timerSequence();
  };

  configPlayButton = () => {
    if (!this.state.started) {
      Tone.start().then(() => {
        Tone.getDestination();
        this.configLoop();
        this.setState({
          started: true,
          playing: true,
        });
      });
    }
  };

  stopPlay = () => {
    Tone.Transport.stop();
    this.setState({
      started: false,
      playing: false,
    });
  };

  handleUpdatedDrumSequence = (sequenceId, sequence, noteId, note) => {
    //Spread the array of all the drum sequences
    const sequences = [...this.state.drumArray];

    //Retrieve the copied array to be manipulated
    const arrayToUpdate = sequences[sequenceId];
    console.log("Sequences:", sequences, "Array to update:", arrayToUpdate);

    sequences[sequenceId][noteId] = sequences[sequenceId][noteId]
      ? null
      : note.note;
    note.isActive = !note.isActive;

    if (sequenceId === 0) {
      this.setState(
        {
          drumArray: sequences,
        },
        () => {
          this.state.kickSequence.set({
            events: sequences[sequenceId],
          });
        }
      );
    } else if (sequenceId === 1) {
      this.setState(
        {
          drumArray: sequences,
        },
        () => {
          this.state.clapSequence.set({
            events: sequences[sequenceId],
          });
        }
      );
    } else if (sequenceId === 2) {
      this.setState(
        {
          drumArray: sequences,
        },
        () => {
          this.state.hiHatSequence.set({
            events: sequences[sequenceId],
          });
        }
      );
    } else if (sequenceId === 3) {
      this.setState(
        {
          drumArray: sequences,
        },
        () => {
          this.state.openHatSequence.set({
            events: sequences[sequenceId],
          });
        }
      );
    }

    //Toggle the note of the array to be updated

    //Set the state of the allDrumSequence to the array that was retrieved

    // console.log(arrayToUpdate[noteId]);
  };

  leadArrayMelody = (e, column, columnId, noteArrayId, note) => {
    let updatedLeadArray = [...this.state.leadSynthArray];

    if (note.isActive) {
      updatedLeadArray[this.state.activeSequence.activeLeadSequence][columnId] =
        null;
    } else {
      column.forEach((columnItem) => {
        columnItem.forEach((note) => {
          note.isActive = false;
        });
      });
      updatedLeadArray[this.state.activeSequence.activeLeadSequence][columnId] =
        note.note;
    }

    this.setState(
      {
        leadSynthArray: updatedLeadArray,
      },
      () => {
        this.state.sequenceOne.set({
          events:
            this.state.leadSynthArray[
              this.state.activeSequence.activeLeadSequence
            ],
        });
      }
    );
    this.handleNoteClick(note, column);
  };

  bassArrayMelody = (e, column, columnId, noteArrayId, note) => {
    let updatedBassArray = [...this.state.bassSynthArray];

    if (note.isActive) {
      updatedBassArray[this.state.activeSequence.activeBassSequence][columnId] =
        null;
    } else {
      column.forEach((columnItem) => {
        columnItem.forEach((note) => {
          note.isActive = false;
        });
      });
      updatedBassArray[this.state.activeSequence.activeBassSequence][columnId] =
        note.note;
    }

    this.setState(
      {
        bassSynthArray: updatedBassArray,
      },
      () => {
        this.state.sequenceTwo.set({
          events:
            this.state.bassSynthArray[
              this.state.activeSequence.activeBassSequence
            ],
        });
      }
    );

    this.handleNoteClick(note, column);
  };

  playArray = () => {
    this.state.sequenceOne.set({
      events:
        this.state.leadSynthArray[this.state.activeSequence.activeLeadSequence],
    });
    this.state.sequenceTwo.set({
      events:
        this.state.bassSynthArray[this.state.activeSequence.activeBassSequence],
    });
  };

  changeTempo = (e) => {
    this.setState(
      {
        tempo: e.target.value,
      },
      () => {
        Tone.Transport.bpm.value = this.state.tempo;
      }
    );
  };

  editEnvelope = (e, synth) => {
    if (synth === "synthOne") {
      const updatedSynthOneADSR = {
        ...this.state.synthOneADSR,
      };

      updatedSynthOneADSR[e.target.name] = Number(e.target.value);

      this.setState({
        synthOneADSR: updatedSynthOneADSR,
      });
    } else if (synth === "synthTwo") {
      const updatedSynthTwoADSR = {
        ...this.state.synthTwoADSR,
      };

      updatedSynthTwoADSR[e.target.name] = Number(e.target.value);

      this.setState({
        synthTwoADSR: updatedSynthTwoADSR,
      });
    }
  };

  openSettings = () => {
    this.setState({
      isSettingsOpen: !this.state.isSettingsOpen,
    });
  };

  changeOscillator = (type) => {
    let updatedOscillator = {
      type: `${type}`,
    };
    this.setState(
      {
        synthOneOscillator: updatedOscillator,
      },
      () => {
        synthOne.set({
          oscillator: this.state.synthOneOscillator,
        });
      }
    );
  };

  render() {
    synthOne.set({
      oscillator: this.state.synthOneOscillator,
      envelope: this.state.synthOneADSR,
    });
    synthTwo.set({
      oscillator: this.state.synthTwoOscillator,
      envelope: this.state.synthTwoADSR,
    });

    return (
      <div className="App">
        <header
          className={`App-header ${
            this.state.darkMode ? "App-header--dark-mode" : ""
          }`}
        >
          <img
            src={playButton}
            alt="play button"
            className="App-header__button"
            onMouseDown={this.configPlayButton}
          />
          <img
            src={stopButton}
            alt="stop button"
            className="App-header__button"
            onMouseDown={this.stopPlay}
          />
          <div className="App-header__right-nav">
            <div
              className={`dark-toggle ${
                this.state.darkMode ? "dark-toggle--active" : ""
              }`}
              onClick={() => this.changeDarkMode()}
            >
              <div
                className={`dark-toggle__selector ${
                  this.state.darkMode ? "dark-toggle__selector--dark-mode" : ""
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
            <span className="App-header__tempo">Tempo: {this.state.tempo}</span>{" "}
            <input
              className="App-header__tempo-range"
              type="range"
              min="60"
              max="180"
              value={this.state.tempo}
              onChange={(e) => this.changeTempo(e)}
            />
          </div>
        </header>

        <section className={`visual-container`}>
          <div
            className={`visual-container__middle ${
              this.state.darkMode ? "visual-container__middle--dark-mode" : ""
            }`}
          >
            {this.state.menuOpen ? (
              <div className="sequencer">
                <ul className="sequencer__time">
                  {this.state.sequenceTimer.map((timer, timerIndex) => {
                    return (
                      <li
                        key={timerIndex}
                        className={`sequencer__time-node ${
                          this.state.selectedTimeNode === timerIndex
                            ? "sequencer__time-node--selected"
                            : ""
                        }`}
                      >
                        {timer}
                      </li>
                    );
                  })}
                </ul>
                <div className="sequencer__piano-sequence">
                  <img
                    src={pianoIcon}
                    alt="Piano Display for Sequencers"
                    className="sequencer__piano"
                  />
                  <ul className="sequencer__map">
                    {this.state.sequences.leadSynthSequencer[
                      this.state.activeSequence.activeLeadSequence
                    ].map((column, columnId) => {
                      return column.map((noteArray, noteArrayId) => {
                        return noteArray.map((note, noteId) => {
                          return (
                            <li
                              key={noteId}
                              className={`sequencer__note ${
                                this.state.darkMode
                                  ? "sequencer__note--dark-mode"
                                  : ""
                              }${
                                note.isActive
                                  ? this.state.darkMode
                                    ? "sequencer__note--active-dark"
                                    : "sequencer__note--active"
                                  : ""
                              } 
                      ${
                        this.state.selectedTimeNode === columnId
                          ? "sequencer__note--selected"
                          : ""
                      }`}
                              onMouseDown={(e) =>
                                this.leadArrayMelody(
                                  e,
                                  column,
                                  columnId,
                                  noteArrayId,
                                  note
                                )
                              }
                            >
                              •
                            </li>
                          );
                        });
                      });
                    })}
                  </ul>
                </div>
                <div className="visual-container__envelopes">
                  <div className="visual-container__envelope-label">
                    <span className="visual-container__envelope">A</span>
                    <span className="visual-container__envelope">D</span>
                    <span className="visual-container__envelope">S</span>
                    <span className="visual-container__envelope">R</span>
                  </div>
                  <div className="visual-container__ADSR">
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0"
                      max="0.1"
                      step="0.01"
                      value={this.state.synthOneADSR.attack}
                      name="attack"
                      onChange={(e) => this.editEnvelope(e, "synthOne")}
                    />
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={this.state.synthOneADSR.decay}
                      name="decay"
                      onChange={(e) => this.editEnvelope(e, "synthOne")}
                    />
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={this.state.synthOneADSR.sustain}
                      name="sustain"
                      onChange={(e) => this.editEnvelope(e, "synthOne")}
                    />
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0.1"
                      max="3"
                      step="0.1"
                      value={this.state.synthOneADSR.release}
                      name="release"
                      onChange={(e) => this.editEnvelope(e, "synthOne")}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <LeftSixth
                darkMode={this.state.darkMode}
                notes={
                  this.state.leadSynthArray[
                    this.state.activeSequence.activeLeadSequence
                  ]
                }
                timeNode={this.state.selectedTimeNode}
                leadRelease={this.state.synthOneADSR.release}
                leadAttack={this.state.synthOneADSR.attack}
              />
            )}

            <div className="visual-container__hihats-eye">
              <VisualEye
                darkMode={this.state.darkMode}
                playing={this.state.playing}
                steps={this.state.drumArray[0]}
                claps={this.state.drumArray[1]}
                timeNode={this.state.selectedTimeNode}
                hiHatArray={this.state.drumArray[2]}
              />
              <div className="visual-container__sequence-selection">
                <SequenceList
                  sequences={this.state.sequenceButtons}
                  handleActiveButton={this.handleActiveButton}
                />
              </div>
            </div>
            {this.state.menuOpen ? (
              <div className="sequencer">
                <ul className="sequencer__time">
                  {this.state.sequenceTimer.map((timer, timerIndex) => {
                    return (
                      <li
                        key={timerIndex}
                        className={`sequencer__time-node ${
                          this.state.selectedTimeNode === timerIndex
                            ? "sequencer__time-node--selected"
                            : ""
                        }`}
                      >
                        {timer}
                      </li>
                    );
                  })}
                </ul>
                <div className="sequencer__piano-sequence">
                  <img
                    src={pianoIcon}
                    alt="Piano Display for Sequencers"
                    className="sequencer__piano"
                  />
                  <ul className="sequencer__map">
                    {this.state.sequences.bassSynthSequencer[
                      this.state.activeSequence.activeBassSequence
                    ].map((column, columnId) => {
                      return column.map((noteArray, noteArrayId) => {
                        return noteArray.map((note, noteId) => (
                          <li
                            key={noteId}
                            className={`sequencer__note ${
                              this.state.darkMode
                                ? "sequencer__note--dark-mode"
                                : ""
                            } ${
                              note.isActive
                                ? this.state.darkMode
                                  ? "sequencer__note--active-dark"
                                  : "sequencer__note--active"
                                : ""
                            } ${
                              this.state.selectedTimeNode === columnId
                                ? "sequencer__note--selected"
                                : ""
                            }`}
                            onMouseDown={(e) =>
                              this.bassArrayMelody(
                                e,
                                column,
                                columnId,
                                noteArrayId,
                                note
                              )
                            }
                          >
                            •
                          </li>
                        ));
                      });
                    })}
                  </ul>
                </div>
                <div className="visual-container__envelopes">
                  <div className="visual-container__envelope-label">
                    <span className="visual-container__envelope">A</span>
                    <span className="visual-container__envelope">D</span>
                    <span className="visual-container__envelope">S</span>
                    <span className="visual-container__envelope">R</span>
                  </div>
                  <div className="visual-container__ADSR">
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0"
                      max="0.1"
                      step="0.01"
                      value={this.state.synthTwoADSR.attack}
                      name="attack"
                      onChange={(e) => this.editEnvelope(e, "synthTwo")}
                    />
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={this.state.synthTwoADSR.decay}
                      name="decay"
                      onChange={(e) => this.editEnvelope(e, "synthTwo")}
                    />
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0.1"
                      max="1"
                      step="0.1"
                      value={this.state.synthTwoADSR.sustain}
                      name="sustain"
                      onChange={(e) => this.editEnvelope(e, "synthTwo")}
                    />
                    <input
                      className="visual-container__settings-input"
                      type="range"
                      min="0.1"
                      max="5"
                      step="0.1"
                      value={this.state.synthTwoADSR.release}
                      name="release"
                      onChange={(e) => this.editEnvelope(e, "synthTwo")}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <RightSixth
                darkMode={this.state.darkMode}
                notes={
                  this.state.leadSynthArray[
                    this.state.activeSequence.activeLeadSequence
                  ]
                }
                timeNode={this.state.selectedTimeNode}
                leadRelease={this.state.synthOneADSR.release}
                leadAttack={this.state.synthOneADSR.attack}
              />
            )}
          </div>
          <button onClick={() => this.handleMenu()}>Hello</button>
          <div
            className={`visual-container__bottom ${
              this.state.darkMode ? "visual-container__bottom--dark-mode" : ""
            }`}
          >
            {this.state.menuOpen ? (
              <section className="sequencer">
                {this.state.sequences.allDrumSequencer.map(
                  (sequence, sequenceId) => {
                    return (
                      <ul className="sequencer__drum-map" key={sequenceId}>
                        {sequence.map((note, noteId) => {
                          return (
                            <li
                              key={noteId}
                              className={`sequencer__note ${
                                this.state.darkMode
                                  ? "sequencer__note--dark-mode"
                                  : ""
                              }${
                                note.isActive ? "sequencer__note--active" : ""
                              } ${
                                this.state.selectedTimeNode === noteId
                                  ? "sequencer__note--selected"
                                  : ""
                              }`}
                              onClick={() =>
                                this.handleUpdatedDrumSequence(
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
                  }
                )}
              </section>
            ) : (
              <Squares
                darkMode={this.state.darkMode}
                notes={
                  this.state.bassSynthArray[
                    this.state.activeSequence.activeBassSequence
                  ]
                }
                timeNode={this.state.selectedTimeNode}
                bassRelease={this.state.synthTwoADSR.release}
                bassAttack={this.state.synthTwoADSR.attack}
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
}

export default App;
