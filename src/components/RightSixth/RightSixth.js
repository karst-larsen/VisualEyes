import React from 'react';
import './RightSixth.scss'

function RightSixth({notes, timeNode}) {
    return (
        <div className="sixth">
            <div className={`long-box__box-4 ${notes[4] === 'C5' && timeNode === 4 ? `long-box--blue` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-5 ${notes[5] === 'C5' && timeNode === 5 ? `long-box--blue` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-6 ${notes[6] === 'C5' && timeNode === 6 ? `long-box--blue` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-7 ${notes[7] === 'C5' && timeNode === 7 ? `long-box--blue` : 'long-box--regular'}`}></div>
            
        </div>
    );
}

export default RightSixth;