import './App.scss';
import { Component } from 'react'
import * as Tone from 'tone'
import VisualEye from './components/VisualEye/VisualEye';
import LeftSixth from './components/LeftSixth/LeftSixth'
import RightSixth from  './components/RightSixth/RightSixth'
import Squares from './components/Squares/Squares'
import { synthOne, synthTwo } from './utils/Synths'
import { sequenceTimer } from './utils/SequenceTimer'
import { leadSynthNotes, bassSynthNotes } from './utils/SynthOneNotes'
import { drumSequencer, clapSequencer, hiHatSequencer, openHatSequencer } from './components/DrumSequencer/DrumSequencer'
import pianoIcon from './assets/images/icons/octavePiano.svg'
import playButton from './assets/images/icons/play-button.svg'
import stopButton from './assets/images/icons/stop-button.svg'
import kickSound from './assets/sounds/kick/kick (16).wav'
import clapSound from './assets/sounds/clap/clap(1).wav'
import hiHatSound from './assets/sounds/hihat/hihat(1).WAV'
import openHatSound from './assets/sounds/openhat/hi hat (36).wav'
import kickIcon from './assets/images/icons/Kick.svg'
import clapIcon from './assets/images/icons/Clap.svg'
import hiHatIcon from './assets/images/icons/HiHat.svg'
import openHatIcon from './assets/images/icons/OpenHat.svg'
import settingsIcon from './assets/images/icons/SettingsIcon.svg'

class App extends Component {
  constructor() {
    super(); 
    const sequenceOne = new Tone.Sequence((time, note) => {
      synthOne.triggerAttackRelease(note, 0.1, time)
    }, [], '16n')
    const sequenceTwo = new Tone.Sequence((time, note) => {
      synthTwo.triggerAttackRelease(note, 0.1, time)
    }, [], '16n')

    const drumSampler = new Tone.Players({
      kick: kickSound,
      clap: clapSound,
      hiHat: hiHatSound,
      openHat: openHatSound,
    }).toDestination()

    let kickSequence = new Tone.Sequence((time, note) => {
      this.state.drumSampler.player(note).start(time)
    }, [], '16n')

    let clapSequence = new Tone.Sequence((time, note) => {
      this.state.drumSampler.player(note).start(time)
    }, [], '16n')

    let hiHatSequence = new Tone.Sequence((time, note) => {
      this.state.drumSampler.player(note).start(time)
    }, [], '16n')

    let openHatSequence = new Tone.Sequence((time, note) => {
      this.state.drumSampler.player(note).start(time)
    }, [], '16n')

    this.state = {
      playing: false,
      started: false,
      timerArray: new Array(32).fill(null), 
      leadSynthArray: new Array(32).fill(null),
      bassSynthArray: new Array(32).fill(null),
      kickDrumArray: new Array(32).fill(null),
      clapArray: new Array(32).fill(null),
      hiHatArray: new Array(32).fill(null),
      openHatArray: new Array(32).fill(null),
      sequenceOne,
      sequenceTwo,
      kickSequence,
      kickSequencer: drumSequencer(),
      clapSequence,
      clapSequencer: clapSequencer(),
      hiHatSequence,
      hiHatSequencer: hiHatSequencer(),
      openHatSequence, 
      openHatSequencer: openHatSequencer(),
      leadSynthSequencer: leadSynthNotes(),
      bassSynthSequencer: bassSynthNotes(),
      sequenceTimer: sequenceTimer(),
      drumSampler,
      isActive: false,
      tempo: 120,
      selectedTimeNode: null,
      synthOneOscillator: {
        type: 'sawtooth',
      },
      synthOneADSR: {
        attack: 0,
        decay: 0.5, 
        sustain: 0.5,
        release: 1
      },
      synthTwoOscillator: {
        type: 'sawtooth'
      },
      synthTwoADSR: {
        attack: 0,
        decay: 0.1, 
        sustain: 0.1,
        release: 1
      },
      isSettingsOpen: false
    }
  }

  //Clock for selecting index of 32 steps
  timerSequence = () => {
    Tone.Transport.scheduleRepeat(time => {
      this.setState({
        selectedTimeNode: Tone.Transport.getTicksAtTime(time) / 48
      })
    }, "16n")
  }

  //Changes node colour based on user select
  handleNoteClick = (note, column) => {
    column.forEach(noteItem => {
      this.setState({
        isActive: false
      })
    })

    note.isActive = !note.isActive
    this.setState({
      isActive: note.isActive
    });
  }

  //Starts loop sequence
  startLoop = (sequence) => {
    sequence.start()
  }

  configLoop = () => {
    this.state.sequenceOne.set({
      events: this.state.leadSynthArray
    })

    this.state.sequenceTwo.set({
      events: this.state.bassSynthArray
    })

    this.state.sequenceOne.start()
    this.state.sequenceTwo.start()
    this.state.kickSequence.start()
    this.state.clapSequence.start()
    this.state.hiHatSequence.start()
    this.state.openHatSequence.start()

    Tone.Transport.bpm.value = this.state.tempo;
    Tone.Transport.loop = true;
    Tone.Transport.loopStart = 0;
    Tone.Transport.loopEnd = "2:0:0"
    Tone.Transport.start();

    this.timerSequence();
  } 

  configPlayButton = () => {
    if (!this.state.started) {
      Tone.start().then(() => {
        Tone.getDestination();
        this.configLoop();
        this.setState({
          started: true,
          playing: true
        })
      })
    }
  }

  stopPlay = () => {
    Tone.Transport.stop();
    this.setState({
      started: false,
      playing: false
    })
  }

  drumSequence = (e, kickIndex, kick) => {
    let updatedDrumSequence = [...this.state.kickDrumArray]

    if (updatedDrumSequence[kickIndex]) {
      updatedDrumSequence[kickIndex] = null
      kick.isActive = false
    } else {
      updatedDrumSequence[kickIndex] = kick.note
      kick.isActive = true
    }

    this.setState({
      kickDrumArray: updatedDrumSequence
    }, () => {
      this.state.kickSequence.set({
        events: updatedDrumSequence
      })
    })
  }

  clapSequence = (e, clapIndex, clap) => {
    let updatedDrumSequence = [...this.state.clapArray]

    if (updatedDrumSequence[clapIndex]) {
      updatedDrumSequence[clapIndex] = null
      clap.isActive = false
    } else {
      updatedDrumSequence[clapIndex] = clap.note
      clap.isActive = true
    }
    
    this.setState({
      clapArray: updatedDrumSequence
    }, () => {
      this.state.clapSequence.set({
        events: updatedDrumSequence
      })
    })
  }

  hiHatSequence = (e, hiHatIndex, hiHat) => {
    let updatedDrumSequence = [...this.state.hiHatArray]

    if (updatedDrumSequence[hiHatIndex]) {
      updatedDrumSequence[hiHatIndex] = null
      hiHat.isActive = false
    } else {
      updatedDrumSequence[hiHatIndex] = hiHat.note
      hiHat.isActive = true
    }
    

    this.setState({
      hiHatArray: updatedDrumSequence
    }, () => {
      this.state.hiHatSequence.set({
        events: updatedDrumSequence
      })
    })
  }

  openHatSequence = (e, openHatIndex, openHat) => {
    let updatedDrumSequence = [...this.state.openHatArray]

    if (updatedDrumSequence[openHatIndex]) {
      updatedDrumSequence[openHatIndex] = null
      openHat.isActive = false
    } else {
      updatedDrumSequence[openHatIndex] = openHat.note
      openHat.isActive = true
    }
    

    this.setState({
      openHatArray: updatedDrumSequence
    }, () => {
      this.state.openHatSequence.set({
        events: updatedDrumSequence
      })
    })
  }

  leadArrayMelody = (e, column, columnId, noteArrayId, note) => {
      let updatedLeadArray = [...this.state.leadSynthArray];
  
      if(note.isActive) {
        updatedLeadArray[columnId] = null
      } else {
        column.forEach(columnItem => {
          columnItem.forEach(note => {
            note.isActive = false
          })
        })
        updatedLeadArray[columnId] = note.note
      }
      
      this.setState({
        leadSynthArray: updatedLeadArray
      }, () => {
        this.state.sequenceOne.set({
          events: this.state.leadSynthArray
        })
      })
      this.handleNoteClick(note, column)
  }

  bassArrayMelody = (e, column, columnId, noteArrayId, note) => {
    let updatedBassArray = [...this.state.bassSynthArray];

    if(note.isActive) {
      updatedBassArray[columnId] = null
    } else {
        column.forEach(columnItem => {
        columnItem.forEach(note => {
          note.isActive = false
        })
      })
      updatedBassArray[columnId] = note.note
    }
    
    this.setState({
      bassSynthArray: updatedBassArray,
    }, () => {
      this.state.sequenceTwo.set({
        events: this.state.bassSynthArray
      })
    })
    this.handleNoteClick(note, column)
  }
  
  playArray = () => {
    this.state.sequenceOne.set({
      events: this.state.leadSynthArray
    })
    this.state.sequenceTwo.set({
      events: this.state.bassSynthArray
    })
  }
  
  changeTempo = (e) => {
    this.setState({
      tempo: e.target.value
    }, () => {
      Tone.Transport.bpm.value = this.state.tempo
    })
  }

  editEnvelope = (e, synth) => {
    if (synth === 'synthOne') {

      let updatedSynthOneADSR = {
        ...this.state.synthOneADSR
      }

      updatedSynthOneADSR[e.target.name] = Number(e.target.value);

      this.setState({
        synthOneADSR: updatedSynthOneADSR
      }, () => {
        console.log(updatedSynthOneADSR.attack)
      })
    } else if (synth === 'synthTwo') {

      let updatedSynthTwoADSR = {
        ...this.state.synthTwoADSR
      }

      updatedSynthTwoADSR[e.target.name] = Number(e.target.value)

      this.setState({
        synthTwoADSR: updatedSynthTwoADSR
    })
  }}

  openSettings = () => {
    this.setState({
      isSettingsOpen: !this.state.isSettingsOpen
    })
  }

  changeOscillator = (type) => {
    let updatedOscillator = {
      type: `${type}`
    }
    this.setState({
      synthOneOscillator: updatedOscillator
    },() => {
      synthOne.set({
        oscillator: this.state.synthOneOscillator
      })
    })
  }
  
  render() {
    synthOne.set({
      oscillator: this.state.synthOneOscillator,
      envelope: this.state.synthOneADSR,
    })
    synthTwo.set({
      oscillator: this.state.synthTwoOscillator,
      envelope: this.state.synthTwoADSR,
    })

    return (
      <div className="App">
        <header className="App-header">
          <img src={playButton} alt='play button' className="App-header__button" onMouseDown={this.configPlayButton} />
          <img src={stopButton} alt='stop button' className="App-header__button" onMouseDown={this.stopPlay} />
          {/* <button onClick={() => this.changeOscillator('sawtooth')}>Square</button> */}
          <span className="App-header__logo">VisualEyes</span>
          {/* <div className="App-header__tempo-box"><span className="App-header__tempo">Tempo: {this.state.tempo}</span> <input className="App-header__tempo-range" type="range" min="60" max="180" value={this.state.tempo} onChange={(e) => this.changeTempo(e)}/></div> */}
        </header>

        <section className={`visual-container`}>
          <div className={`visual-container__settings ${this.state.isSettingsOpen ? 'visual-container__settings--open' : ''}`}>
            <div onClick={this.openSettings} className={`visual-container__settings-button ${this.state.isSettingsOpen ? 'visual-container__settings-button--open' : ''}`}>
              <img src={settingsIcon} alt="settings" className="visual-container__settings-icon" />
            </div>
              {/* <div className="visual-container__envelopes">
                <div className="visual-container__envelope-label">
                  <span className="visual-container__envelope">A</span>
                  <span className="visual-container__envelope">D</span>
                  <span className="visual-container__envelope">S</span>
                  <span className="visual-container__envelope">R</span>
                </div>
                <div className="visual-container__ADSR">
                  <input className="visual-container__settings-input" type="range" min="0" max="0.1" step="0.01" value={this.state.synthOneADSR.attack} name="attack" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                  <input className="visual-container__settings-input" type="range" min="0.1" max="1" step="0.1" value={this.state.synthOneADSR.decay} name="decay" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                  <input className="visual-container__settings-input" type="range" min="0.1" max="1" step="0.1" value={this.state.synthOneADSR.sustain} name="sustain" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                  <input className="visual-container__settings-input" type="range" min="0.1" max="3" step="0.1" value={this.state.synthOneADSR.release} name="release" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                </div>
              </div> */}
            <div className="visual-container__ADSR">
           <input className="visual-container__settings-input" type="range" min="0" max="0.1" step="0.01" value={this.state.synthTwoADSR.attack} name="attack" onChange={(e) => this.editEnvelope(e, 'synthTwo')} />
           <input className="visual-container__settings-input" type="range" min="0.1" max="1" step="0.1" value={this.state.synthTwoADSR.decay} name="decay" onChange={(e) => this.editEnvelope(e, 'synthTwo')} />
           <input className="visual-container__settings-input" type="range" min="0.1" max="1" step ="0.1" value={this.state.synthTwoADSR.sustain} name="sustain" onChange={(e) => this.editEnvelope(e, 'synthTwo')} />
           <input className="visual-container__settings-input" type="range" min="0.1" max="3" step="0.1" value={this.state.synthTwoADSR.release} name="release" onChange={(e) => this.editEnvelope(e, 'synthTwo')} />
           </div>
            {/* <label className={`visual-container__label ${ this.state.isSettingsOpen ? 'visual-container__label--active' : ''}`}> Tempo: {this.state.tempo}
            <input className="visual-container__settings-input" type="range" min="60" max="180" value={this.state.tempo} onChange={(e) => this.changeTempo(e)}/></label> */}
            {/* <input type="range" min="1" max="10" value={this.state.synthTwoADSR.release} name="release" onChange={(e) => this.editEnvelope(e, 'synthTwo')} /> */}
          </div>
          <div className="visual-container__middle">
        <LeftSixth notes={this.state.leadSynthArray} timeNode={this.state.selectedTimeNode} leadRelease={this.state.synthOneADSR.release} leadAttack={this.state.synthOneADSR.attack}/>
        <VisualEye playing={this.state.playing} steps={this.state.kickDrumArray} timeNode={this.state.selectedTimeNode} openHatArray={this.state.openHatArray}/>
        <RightSixth notes={this.state.leadSynthArray} timeNode={this.state.selectedTimeNode} leadRelease={this.state.synthOneADSR.release} leadAttack={this.state.synthOneADSR.attack} />
          </div>
          <div className="visual-container__bottom">
        <Squares notes={this.state.bassSynthArray} timeNode={this.state.selectedTimeNode} claps={this.state.clapArray} />
          </div>
        </section>
        <div className="sequencer">
          <ul className="sequencer__time">
            {this.state.sequenceTimer.map((timer, timerIndex) => {
              return <li key={timerIndex} className={`sequencer__time-node ${this.state.selectedTimeNode === timerIndex ? 'sequencer__time-node--selected' : ''} `}>{timer}</li>
            })}
          </ul>
            <div className="sequencer__icon-box">
            <img src={kickIcon} alt='kick icon' className="sequencer__icon" />
          <ul className="sequencer__drum-map">
            {this.state.kickSequencer.map((kick, kickIndex) => {
              return <li key={kickIndex} className={`sequencer__note ${kick.isActive ? 'sequencer__note--active' : ''} ${this.state.selectedTimeNode === kickIndex ? 'sequencer__note--selected' : ''}`} onClick={(e) => {this.drumSequence(e, kickIndex, kick)}}>•</li>
            })}
          </ul>
          </div>
          <div className="sequencer__icon-box">
            <img src={clapIcon} alt='clap icon' className="sequencer__icon" />
          <ul className="sequencer__drum-map">
            {this.state.clapSequencer.map((clap, clapIndex) => {
              return <li key={clapIndex} className={`sequencer__note ${clap.isActive ? 'sequencer__note--active' : ''} ${this.state.selectedTimeNode === clapIndex ? 'sequencer__note--selected' : ''}`} onClick={(e) => {this.clapSequence(e, clapIndex, clap)}}>•</li>
            })}
          </ul>
          </div>
          <div className="sequencer__icon-box">
            <img src={hiHatIcon} alt='kick icon' className="sequencer__icon" />
          <ul className="sequencer__drum-map">
            {this.state.hiHatSequencer.map((hiHat, hiHatIndex) => {
              return <li  key={hiHatIndex} className={`sequencer__note ${hiHat.isActive ? 'sequencer__note--active' : ''} ${this.state.selectedTimeNode === hiHatIndex ? 'sequencer__note--selected' : ''}`} onClick={(e) => {this.hiHatSequence(e, hiHatIndex, hiHat)}}>•</li>
            })}
          </ul>
          </div>
          <div className="sequencer__icon-box">
            <img src={openHatIcon} alt='kick icon' className="sequencer__icon" />
          <ul className="sequencer__drum-map">
            {this.state.openHatSequencer.map((openHat, openHatIndex) => {
              return <li  key={openHatIndex} className={`sequencer__note ${openHat.isActive ? 'sequencer__note--active' : ''} ${this.state.selectedTimeNode === openHatIndex ? 'sequencer__note--selected' : ''}`} onClick={(e) => {this.openHatSequence(e, openHatIndex, openHat)}}>•</li>
            })}
          </ul>
          </div>
        </div>
        <div className="sequencer">
          <ul className="sequencer__time">
            {this.state.sequenceTimer.map((timer, timerIndex) => {
              return <li key={timerIndex}className={`sequencer__time-node ${this.state.selectedTimeNode === timerIndex ? 'sequencer__time-node--selected' : ''} `}>{timer}</li>
            })}
          </ul>
          <div className="sequencer__piano-sequence">
          <img src={pianoIcon} alt="Piano Display for Sequencers" className="sequencer__piano"/>
          <ul className="sequencer__map">
            {this.state.leadSynthSequencer.map((column, columnId) => {
              return column.map((noteArray, noteArrayId) => {
                return noteArray.map((note, noteId) => {
                  return <li 
                  key={noteId}
                  className={`sequencer__note ${note.isActive ? 'sequencer__note--active' : ''} 
                  ${this.state.selectedTimeNode === columnId ? 'sequencer__note--selected' : ''}`} 
                  onMouseDown={(e) => this.leadArrayMelody(e, column, columnId, noteArrayId, note)}
                  >•</li>
                })
              })
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
                  <input className="visual-container__settings-input" type="range" min="0" max="0.1" step="0.01" value={this.state.synthOneADSR.attack} name="attack" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                  <input className="visual-container__settings-input" type="range" min="0.1" max="1" step="0.1" value={this.state.synthOneADSR.decay} name="decay" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                  <input className="visual-container__settings-input" type="range" min="0.1" max="1" step="0.1" value={this.state.synthOneADSR.sustain} name="sustain" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                  <input className="visual-container__settings-input" type="range" min="0.1" max="3" step="0.1" value={this.state.synthOneADSR.release} name="release" onChange={(e) => this.editEnvelope(e, 'synthOne')} />
                </div>
              </div>
        </div>
        <div className="sequencer">
        <ul className="sequencer__time">
            {this.state.sequenceTimer.map((timer, timerIndex) => {
              return <li key={timerIndex} className={`sequencer__time-node ${this.state.selectedTimeNode === timerIndex ? 'sequencer__time-node--selected' : ''}`}>{timer}</li>
            })}
          </ul>
          <div className="sequencer__piano-sequence">
          <img src={pianoIcon} alt="Piano Display for Sequencers" className="sequencer__piano"/>
          <ul className="sequencer__map">        
            {this.state.bassSynthSequencer.map((column, columnId) => {
              return column.map((noteArray, noteArrayId) => {
                return noteArray.map((note, noteId) => <li key={noteId} className={`sequencer__note ${note.isActive ? 'sequencer__note--active' : ''} ${this.state.selectedTimeNode === columnId ? 'sequencer__note--selected' : ''}`} onMouseDown={(e) => this.bassArrayMelody(e, column, columnId, noteArrayId, note)}>•</li>)
              })
          })}
          </ul>
          </div>
        </div>
        <div className="footer">
        <span className="footer__logo">VisualEyes</span>
        </div>
      </div>
    );
  }
}

export default App;
