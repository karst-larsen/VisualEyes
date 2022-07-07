import * as Tone from 'tone'


let synthOne = new Tone.Synth({
    resonance: 0.5,
    volume: 0
  }).toDestination();

  let synthTwo = new Tone.Synth({
    resonance: 0.5,
    volume: -5
  }).toDestination();


 export { synthOne, synthTwo }
  