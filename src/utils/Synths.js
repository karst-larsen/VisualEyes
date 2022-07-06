import * as Tone from 'tone'


let synthOne = new Tone.Synth({
    oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      attack: 0, 
      decay: 0.3, 
      sustain: 0.3, 
      release: 0.5
    },
    resonance: 0.5,
    volume: -10
  }).toDestination();

  let synthTwo = new Tone.Synth({
    oscillator: {
      type: 'sawtooth'
    },
    envelope: {
      attack: 0, 
      decay: 0.4, 
      sustain: 0.1, 
      release: 0.4
    },
    resonance: 0.5,
    volume: -5
  }).toDestination();


 export { synthOne, synthTwo }
  