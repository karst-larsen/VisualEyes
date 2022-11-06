function SequenceButton({ button, handleActiveButton }) {

    return (
        <button className={`visual-container__sequence-button ${button.isActive ? "visual-container__sequence-button--active" : ""}`} onClick={() => handleActiveButton(button.id)}>
            {button.name}
        </button>
    );
}

export default SequenceButton;