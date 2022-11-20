import Slider from "@mui/material/Slider";
import "./SynthSequencer.scss";

function SynthSequencer({
  timer,
  envelopes,
  timeNode,
  synthSequence,
  activeSequence,
  darkMode,
  arrayMelody,
  editEnvelope,
  scaleChange,
  synth,
}) {
  return (
    <div className="sequencer">
      <div className="sequencer__piano-sequence">
        <ul className="sequencer__map">
          {synthSequence[activeSequence].map((column, columnId) => {
            return column.map((noteArray, noteArrayId) => {
              return noteArray.map((note, noteId) => {
                return (
                  <li
                    key={noteId}
                    className={`sequencer__note ${
                      darkMode ? "sequencer__note--dark-mode" : ""
                    } ${
                      note.isActive
                        ? darkMode
                          ? "sequencer__note--active-dark"
                          : "sequencer__note--active"
                        : ""
                    } 
              ${timeNode === columnId ? "sequencer__note--selected" : ""}`}
                    onMouseDown={(e) =>
                      arrayMelody(e, column, columnId, noteArrayId, note)
                    }
                  >
                    •
                  </li>
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
