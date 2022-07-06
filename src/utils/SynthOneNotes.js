const leadSynthNotes = () => {
    let synthSequencer = []
    let leadScale = ["C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4", "C5"]
    
    for (let i = 0; i < 32; i++) {
        let synthColumn = []
        for (let j = 0; j < 13; j++) {
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
    let leadScale = ["C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2", "C3"]
    
    for (let i = 0; i < 32; i++) {
        let synthColumn = []
        for (let j = 0; j < 13; j++) {
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