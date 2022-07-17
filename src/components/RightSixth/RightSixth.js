import React from 'react';
import './RightSixth.scss'

function RightSixth({notes, timeNode, leadRelease, leadAttack}) {

    //Logic determining how long the release transition effect should hold for 

    let releaseSpeed = ''

    if (leadRelease < 0.5) {
       releaseSpeed = '--short-release'
    } else if (leadRelease >= 0.5 && leadRelease < 2) {
        releaseSpeed = '--medium-release'
    } else {
        releaseSpeed = '--long-release'
    }

    let attackSpeed = ''

    if (leadAttack < 0.03) {
        attackSpeed = ''
    } else if (leadAttack >= 0.03 && leadAttack < 0.07) {
        attackSpeed = '--medium-attack'
    } else {
        attackSpeed = '--high-attack'
    }


    //Pushing all of the props notes into an array of objects correlated by note and id (index of note in array)

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

    //Connecting each note to a colour for SCSS

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

    //Filtered container which allows notes to play in visual sequence regardless of null

    let filteredContainer = colourContainer.filter(colours => {
        return colours !== null
    })

    return (
        <div className="sixth">
            <div className={`long-box__box-4 
            ${filteredContainer[4]?.id === timeNode || filteredContainer[12]?.id === timeNode || filteredContainer[20]?.id === timeNode || filteredContainer[28]?.id === timeNode 
            ? `long-box--${colourContainer[timeNode]?.timedNote}${attackSpeed}`: 
            `long-box${releaseSpeed}`}`}></div>
            <div className={`long-box__box-5 ${filteredContainer[5]?.id === timeNode || filteredContainer[13]?.id === timeNode || filteredContainer[21]?.id === timeNode || filteredContainer[29]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}${attackSpeed}`: 
            `long-box${releaseSpeed}`}`}></div>
            <div className={`long-box__box-6 ${filteredContainer[6]?.id === timeNode || filteredContainer[14]?.id === timeNode || filteredContainer[22]?.id === timeNode || filteredContainer[30]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}${attackSpeed}`: 
            `long-box${releaseSpeed}`}`}></div>
            <div className={`long-box__box-7 ${filteredContainer[7]?.id === timeNode || filteredContainer[15]?.id === timeNode || filteredContainer[23]?.id === timeNode || filteredContainer[31]?.id === timeNode ? `long-box--${colourContainer[timeNode]?.timedNote}${attackSpeed}`: 
            `long-box${releaseSpeed}`}`}></div>
            
        </div>
    );
}

export default RightSixth;