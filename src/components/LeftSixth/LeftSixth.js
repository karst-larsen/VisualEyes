import './LeftSixth.scss'

function LeftSixth({notes, timeNode}) {
    let color; 


     return (
        <div className="sixth">
            <div className={`long-box__box-0 ${notes[0] === 'C5' && timeNode === 0 ? `long-box--blue`: 'long-box--regular'}`}></div>
            <div className={`long-box__box-1 ${notes[1] === 'C5' && timeNode === 1 ? `long-box--blue` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-2 ${notes[2] === 'C5' && timeNode === 2 ? `long-box--blue` : 'long-box--regular'}`}></div>
            <div className={`long-box__box-3 ${notes[3] === 'C5' && timeNode === 3 ? `long-box--blue` : 'long-box--regular'}`}></div>
            
        </div>
    );
}

export default LeftSixth;