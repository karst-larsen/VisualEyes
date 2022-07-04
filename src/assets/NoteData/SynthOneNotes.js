const leadSynthNotes = () => {
    let synthSequencer = []
    let leadScale = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"]
    
    for (let i = 0; i < 32; i++) {
        let synthColumn = []
        for (let j = 0; j < 25; j++) {
            let synthObj = {
                id: j,
                note: leadScale[j],
                isActive: false
            }
            synthColumn.push(synthObj)
        }
            synthSequencer.push([synthColumn])
        }
        
    return synthSequencer
    
}

const bassSynthNotes = () => {
    let synthSequencer = []
    let leadScale = ["C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1", "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3"]
    
    for (let i = 0; i < 32; i++) {
        let synthColumn = []
        for (let j = 0; j < 25; j++) {
            let synthObj = {
                id: j,
                note: leadScale[j],
                isActive: false
            }
            synthColumn.push(synthObj)
        }
            synthSequencer.push([synthColumn])
        }
        
    return synthSequencer
}

export { leadSynthNotes, bassSynthNotes }