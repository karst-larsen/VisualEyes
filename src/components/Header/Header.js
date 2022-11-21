import playButton from "../../assets/images/icons/play-button.svg";
import stopButton from "../../assets/images/icons/stop-button.svg";
import visualEyesLogo from "../../assets/images/icons/spectrumVisualEyes.png";

function Header({
  handlePlayButton,
  stopPlay,
  darkMode,
  changeDarkMode,
  tempo,
  changeTempo,
}) {
  return (
    <header className={`App-header`}>
      <img
        src={playButton}
        alt="play button"
        className="App-header__button"
        onMouseDown={handlePlayButton}
      />
      <img
        src={stopButton}
        alt="stop button"
        className="App-header__button"
        onClick={stopPlay}
      />
      <div className="App-header__right-nav">
        <div
          className={`dark-toggle ${darkMode ? "dark-toggle--active" : ""}`}
          onClick={changeDarkMode}
        >
          <div
            className={`dark-toggle__selector ${
              darkMode ? "dark-toggle__selector--dark-mode" : ""
            }`}
          ></div>
        </div>
        <img
          src={visualEyesLogo}
          className="App-header__logo"
          alt="VisualEyes Logo"
        />
      </div>
      <div className="App-header__tempo-box">
        <span className="App-header__tempo">Tempo: {tempo}</span>{" "}
        <input
          className="App-header__tempo-range"
          type="range"
          min="60"
          max="180"
          value={tempo}
          onChange={(e) => changeTempo(e)}
        />
      </div>
    </header>
  );
}

export default Header;
