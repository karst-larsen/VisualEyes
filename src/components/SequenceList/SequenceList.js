import SequenceButton from "../SequenceButton/SequenceButton";

function SequenceList({ sequenceButtons, handleActiveButton }) {
    return (
        sequenceButtons.map(button => <SequenceButton button={button} handleActiveButton={handleActiveButton} />)
    );
}

export default SequenceList;