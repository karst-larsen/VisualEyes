import './LeftSixth.scss'

function LeftSixth({notes, timeNode}) {

    let testContainer = []

    for (let i = 0; i < notes.length; i++) {
        if (notes[i] !== null) {
            let newNote = {
                id: i, 
                timedNote: notes[i].slice(0, notes[i].length - 1)
            }
            testContainer.push(newNote)
        } else {
            testContainer.push(null)
        }
    }

    let colourContainer = testContainer.map(hue => {

        if (hue !== null) {
            switch(hue.timedNote) {
                case 'C': 
                    hue.timedNote = 30
                    break;
                case 'C#':
                    hue.timedNote = 60
                    break;
                case 'D':
                    hue.timedNote = 90
                    break;
                case 'D#':
                    hue.timedNote = 120
                    break;
                case 'E':
                    hue.timedNote = 150
                    break;
                case 'F':
                    hue.timedNote = 180
                    break;
                case 'F#':
                    hue.timedNote = 210
                    break;
                case 'G':
                    hue.timedNote = 240
                    break;
                case 'G#':
                    hue.timedNote = 270
                    break;
                case 'A':
                    hue.timedNote = 300
                    break;
                case 'A#':
                    hue.timedNote = 330
                    break;
                case 'B':
                    hue.timedNote = 359
                    break;
                default: 
                    hue.timedNote = null
                    break;
            }
        }
        return hue
    })

    let filteredContainer = colourContainer.filter(colours => {
        return colours !== null
    })


     return (
        <div className="sixth">
            <div className={`long-box__box-0 ${filteredContainer[0]?.id === timeNode || filteredContainer[8]?.id === timeNode || filteredContainer[16]?.id === timeNode || filteredContainer[24]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-1 ${filteredContainer[1]?.id === timeNode || filteredContainer[9]?.id === timeNode || filteredContainer[17]?.id === timeNode || filteredContainer[25]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-2 ${filteredContainer[2]?.id === timeNode || filteredContainer[10]?.id === timeNode || filteredContainer[18]?.id === timeNode || filteredContainer[26]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-3 ${filteredContainer[3]?.id === timeNode || filteredContainer[11]?.id === timeNode || filteredContainer[19]?.id === timeNode || filteredContainer[27]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}` : 'long-box--regular'}`}></div>
            
        </div>
    );
}

export default LeftSixth;