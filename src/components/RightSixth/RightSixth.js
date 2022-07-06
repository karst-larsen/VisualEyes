import React from 'react';
import './RightSixth.scss'

function RightSixth({notes, timeNode}) {
    // let filteredContainer = notes.filter(note => {
    //     return note !== null
    // })

    // let noteContainer = filteredContainer.map(note => {
    //     return note.slice(0, note.length - 1)
    // })

    // let colourContainer = noteContainer.map(hue => {

    //     switch(hue) {
    //         case 'C': 
    //             hue = 30
    //             break;
    //         case 'C#':
    //             hue = 60
    //             break;
    //         case 'D':
    //             hue = 90
    //             break;
    //         case 'D#':
    //             hue = 120
    //             break;
    //         case 'E':
    //             hue = 150
    //             break;
    //         case 'F':
    //             hue = 180
    //             break;
    //         case 'F#':
    //             hue = 210
    //             break;
    //         case 'G':
    //             hue = 240
    //             break;
    //         case 'G#':
    //             hue = 270
    //             break;
    //         case 'A':
    //             hue = 300
    //             break;
    //         case 'A#':
    //             hue = 330
    //             break;
    //         case 'B':
    //             hue = 359
    //             break;
    //         default: 
    //             hue = 0
    //             break;
    //     }
    //     return hue
    // })

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

    // console.log('test container', testContainer)
    // console.log('testContainer', testContainer, 'noteContainer', noteContainer)

    // let colourContainer = noteContainer.map(hue => {

    //     switch(hue) {
    //         case 'C': 
    //             hue = 30
    //             break;
    //         case 'C#':
    //             hue = 60
    //             break;
    //         case 'D':
    //             hue = 90
    //             break;
    //         case 'D#':
    //             hue = 120
    //             break;
    //         case 'E':
    //             hue = 150
    //             break;
    //         case 'F':
    //             hue = 180
    //             break;
    //         case 'F#':
    //             hue = 210
    //             break;
    //         case 'G':
    //             hue = 240
    //             break;
    //         case 'G#':
    //             hue = 270
    //             break;
    //         case 'A':
    //             hue = 300
    //             break;
    //         case 'A#':
    //             hue = 330
    //             break;
    //         case 'B':
    //             hue = 359
    //             break;
    //         default: 
    //             hue = null
    //             break;
    //     }
    //     return hue
    // })

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
            <div className={`long-box__box-4 ${filteredContainer[4]?.id === timeNode || filteredContainer[12]?.id === timeNode || filteredContainer[20]?.id === timeNode || filteredContainer[28]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}`: 'long-box--regular'}`}></div>
            <div className={`long-box__box-5 ${filteredContainer[5]?.id === timeNode || filteredContainer[13]?.id === timeNode || filteredContainer[21]?.id === timeNode || filteredContainer[29]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}`: 'long-box--regular'}`}></div>
            <div className={`long-box__box-6 ${filteredContainer[6]?.id === timeNode || filteredContainer[14]?.id === timeNode || filteredContainer[22]?.id === timeNode || filteredContainer[30]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}`: 'long-box--regular'}`}></div>
            <div className={`long-box__box-7 ${filteredContainer[7]?.id === timeNode || filteredContainer[15]?.id === timeNode || filteredContainer[23]?.id === timeNode || filteredContainer[31]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}`: 'long-box--regular'}`}></div>
            
        </div>
    );
}

export default RightSixth;