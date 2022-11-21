import Tooltip from "@mui/material/Tooltip";

function DrumSection({
  sequences,
  activeSequence,
  darkMode,
  selectedTimeNode,
  handleUpdatedDrumSequence,
}) {
  return (
    <section className="sequencer">
      <h2 className="sequencer__label">Drum Sequencer</h2>
      {sequences.allDrumSequencer[activeSequence.activeDrumSequence].map(
        (sequence, sequenceId) => {
          return (
            <ul className="sequencer__drum-map" key={sequenceId}>
              {sequence.map((note, noteId) => {
                return (
                  <Tooltip
                    key={noteId}
                    title={`Column: ${noteId + 1} Sample: ${note.note}`}
                    placement="right"
                    disableInteractive
                  >
                    <li
                      className={`sequencer__note ${
                        darkMode ? "sequencer__note--dark-mode" : ""
                      } ${
                        note.isActive
                          ? darkMode
                            ? "sequencer__note--active-dark"
                            : "sequencer__note--active"
                          : ""
                      } ${
                        selectedTimeNode === noteId
                          ? "sequencer__note--selected"
                          : ""
                      }`}
                      onClick={() =>
                        handleUpdatedDrumSequence(
                          sequenceId,
                          sequence,
                          noteId,
                          note
                        )
                      }
                    >
                      •
                    </li>
                  </Tooltip>
                );
              })}
            </ul>
          );
        }
      )}
    </section>
  );
}

export default DrumSection;
