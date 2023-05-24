import { useState, useEffect } from "react";
import "./App.css";

const audios = [
  {
    key: "q",
    name: "Heater 1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "w",
    name: "Heater 2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "e",
    name: "Heater 3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "a",
    name: "Heater 4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "s",
    name: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "d",
    name: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "z",
    name: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "x",
    name: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "c",
    name: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

function App() {
  let [displayText, setDisplayText] = useState("");
  const [volume, setVolume] = useState(0.5);

  const [power, setPower] = useState("right");

  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      const index = audios.findIndex((audio) => audio.key === event.key);

      handleClick(index);
    });
  }, []);

  const handleClick = (index) => {
    setDisplayText(audios[index].name);
    const audio = document.getElementById(audios[index].key);
    audio.play();
  };

  const toggleMute = () => {
    for (let i = 0; i < audios.length; i++) {
      const audio = document.getElementById(audios[i].key);
      audio.muted = !audio.muted;
    }

    setIsMuted(!isMuted);
    if (power === "right") setPower("left");
    if (power === "left") setPower("right");
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    for (let i = 0; i < audios.length; i++) {
      const audio = document.getElementById(audios[i].key);
      audio.volume = newVolume;
    }
  };

  return (
    <div className="App">
      <div id="drum-machine" className="container">
        <div className="row">
          <div className="col-7 drums">
            {audios.map((audio, index) => {
              return (
                <div
                  key={index}
                  className="drum-pad"
                  onClick={() => handleClick(index)}
                >
                  {audio.key.toUpperCase()}
                  <audio id={audio.key} className="clip" src={audio.src}>
                    <a href={audio.src}>Download audio</a>
                  </audio>
                </div>
              );
            })}
          </div>
          <div className="col-5 controls-container text-center">
            <div className="control">
              <p>Power</p>
              <div className="select" onClick={toggleMute}>
                <div className="inner" style={{ float: power }}></div>
              </div>
            </div>
            <p id="display" className="text-center">
              {displayText}
            </p>
            <div className="volume-slider">
              <input
                max="1"
                min="0"
                step="0.01"
                type="range"
                value={volume}
                onChange={handleVolumeChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
