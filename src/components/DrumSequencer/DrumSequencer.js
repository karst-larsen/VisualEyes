const drumSequencer = () => {
    let drumSequencer = []
    
    for (let i = 0; i < 32; i++) {
            let drumObj = {
                note: 'kick',
                isActive: false
            }
            drumSequencer.push(drumObj)
        }
    return drumSequencer   
}

const clapSequencer = () => {
    let clapSequencer = []
    
    for (let i = 0; i < 32; i++) {
            let drumObj = {
                note: 'clap',
                isActive: false
            }
            clapSequencer.push(drumObj)
        }
    return clapSequencer   
}
const hiHatSequencer = () => {
    let hiHatSequencer = []
    
    for (let i = 0; i < 32; i++) {
            let drumObj = {
                note: 'hiHat',
                isActive: false
            }
            hiHatSequencer.push(drumObj)
        }
    return hiHatSequencer   
}
const openHatSequencer = () => {
    let openHatSequencer = []
    
    for (let i = 0; i < 32; i++) {
            let drumObj = {
                note: 'openHat',
                isActive: false
            }
            openHatSequencer.push(drumObj)
        }
    return openHatSequencer   
}


export { drumSequencer, clapSequencer, hiHatSequencer, openHatSequencer }