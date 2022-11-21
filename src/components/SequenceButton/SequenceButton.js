function SequenceButton({ button, handleActiveButton, sequence }) {
  return (
    <button
      className={`visual-container__sequence-button ${
        button.isActive ? "visual-container__sequence-button--active" : ""
      }`}
      onClick={() => handleActiveButton(button.id, button, sequence)}
    >
      {button.name}
    </button>
  );
}

export default SequenceButton;
