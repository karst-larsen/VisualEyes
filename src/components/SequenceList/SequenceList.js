import SequenceButton from "../SequenceButton/SequenceButton";

function SequenceList({ sequences, handleActiveButton }) {
  return sequences.map((sequence) =>
    sequence.buttons.map((button, buttonIndex) => (
      <SequenceButton
        key={buttonIndex}
        button={button}
        sequence={sequence}
        handleActiveButton={handleActiveButton}
      />
    ))
  );
}

export default SequenceList;
