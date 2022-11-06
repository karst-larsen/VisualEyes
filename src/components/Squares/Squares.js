import './Squares.scss'

function Squares({darkMode, notes, timeNode, bassRelease, bassAttack}) {


    let releaseSpeed = ''

    if (bassRelease < 0.5) {
        releaseSpeed = '--short-release'
    } else if (bassRelease >= 0.5 && bassRelease < 2) {
        releaseSpeed = '--medium-release'
    } else {
        releaseSpeed = '--long-release'
    }

    let attackSpeed = ''

    if (bassAttack < 0.03) {
        attackSpeed = ''
    } else if (bassAttack >= 0.03 && bassAttack < 0.07) {
        attackSpeed = '--medium-attack'
    } else {
        attackSpeed = '--high-attack'
    }


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
        <div className={`squares-container`}>
            <div className={`squares squares__square-1 ${filteredContainer[0]?.id === timeNode || filteredContainer[8]?.id === timeNode || filteredContainer[16]?.id === timeNode || filteredContainer[24]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-2 ${filteredContainer[1]?.id === timeNode || filteredContainer[9]?.id === timeNode || filteredContainer[17]?.id === timeNode || filteredContainer[25]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-3 ${filteredContainer[2]?.id === timeNode || filteredContainer[10]?.id === timeNode || filteredContainer[18]?.id === timeNode || filteredContainer[26]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-4 ${filteredContainer[3]?.id === timeNode || filteredContainer[11]?.id === timeNode || filteredContainer[19]?.id === timeNode || filteredContainer[27]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-5 ${filteredContainer[4]?.id === timeNode || filteredContainer[12]?.id === timeNode || filteredContainer[20]?.id === timeNode || filteredContainer[28]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-6 ${filteredContainer[5]?.id === timeNode || filteredContainer[13]?.id === timeNode || filteredContainer[21]?.id === timeNode || filteredContainer[29]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-7 ${filteredContainer[6]?.id === timeNode || filteredContainer[14]?.id === timeNode || filteredContainer[22]?.id === timeNode || filteredContainer[30]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
            <div className={`squares squares__square-8 ${filteredContainer[7]?.id === timeNode || filteredContainer[15]?.id === timeNode || filteredContainer[23]?.id === timeNode || filteredContainer[31]?.id === timeNode ? `squares--${colourContainer[timeNode]?.timedNote}${attackSpeed}` : `squares${releaseSpeed}${darkMode ? "--dark-mode" : ""}`}`}></div>
        </div>
    );
}

export default Squares;