import Tooltip from "@mui/material/Tooltip";
import Slider from "@mui/material/Slider";
import "./SynthSequencer.scss";

function SynthSequencer({
  envelopes,
  timeNode,
  synthSequence,
  activeSequence,
  darkMode,
  arrayMelody,
  editEnvelope,
  synth,
}) {
  return (
    <div className="sequencer">
      <h1
        className={`sequencer__label ${
          darkMode ? "sequencer__label--dark-mode" : ""
        }`}
      >
        {synth === "synthOne" ? "Lead Sequencer" : "Bass Sequencer"}
      </h1>
      <div className="sequencer__piano-sequence">
        <ul className="sequencer__map">
          {synthSequence[activeSequence].map((column, columnId) => {
            return column.map((noteArray, noteArrayId) => {
              return noteArray.map((note, noteId) => {
                return (
                  <Tooltip
                    key={noteId}
                    title={`Column: ${columnId + 1} Note: ${note.note}`}
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
                      } 
                    ${
                      timeNode === columnId ? "sequencer__note--selected" : ""
                    }`}
                      onMouseDown={(e) =>
                        arrayMelody(e, column, columnId, noteArrayId, note)
                      }
                    >
                      •
                    </li>
                  </Tooltip>
                );
              });
            });
          })}
        </ul>
      </div>
      <div className="visual-container__envelopes">
        <div className="visual-container__envelope-label">
          <span className="visual-container__envelope">A</span>
          <span className="visual-container__envelope">D</span>
          <span className="visual-container__envelope">S</span>
          <span className="visual-container__envelope">R</span>
        </div>
        <div className="visual-container__ADSR">
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            value={envelopes.attack}
            min={0}
            max={0.1}
            step={0.01}
            name="attack"
            aria-label="attack"
            valueLabelDisplay="auto"
            onChange={(e) => editEnvelope(e, synth)}
            className={darkMode ? "slider--dark-mode" : "slider"}
          />
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            aria-label="decay"
            valueLabelDisplay="auto"
            value={envelopes.decay}
            min={0}
            step={0.1}
            max={1}
            name="decay"
            onChange={(e) => editEnvelope(e, synth)}
            className={darkMode ? "slider--dark-mode" : "slider"}
          />
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
              },
            }}
            orientation="vertical"
            value={envelopes.sustain}
            min={0.1}
            max={1}
            step={0.1}
            aria-label="sustain"
            valueLabelDisplay="auto"
            name="sustain"
            onChange={(e) => editEnvelope(e, synth)}
            className={darkMode ? "slider--dark-mode" : "slider"}
          />
          <Slider
            sx={{
              '& input[type="range"]': {
                WebkitAppearance: "slider-vertical",
                "& .MuiSlider-thumb": {
                  borderRadius: "1px",
                },
              },
            }}
            orientation="vertical"
            min={0.1}
            max={3}
            aria-label="Temperature"
            valueLabelDisplay="auto"
            value={envelopes.release}
            name="release"
            onChange={(e) => editEnvelope(e, synth)}
            className={darkMode ? "slider--dark-mode" : "slider"}
          />
        </div>
      </div>
    </div>
  );
}

export default SynthSequencer;
