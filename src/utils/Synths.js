import * as Tone from 'tone'


let synthOne = new Tone.PolySynth({
    polyphony: 16,
    detune: 400,
    resonance: 0,
    volume: -10,
  }).toDestination();

  let synthTwo = new Tone.Synth({
    resonance: 0.5,
    volume: -10
  }).toDestination();


 export { synthOne, synthTwo }
  