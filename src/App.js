import { useState, useRef, useEffect } from "react";
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
  let [currentSrc, setCurrentSrc] = useState("");

  const audioRef = useRef();
  const [volume, setVolume] = useState(0.5);

  const [power, setPower] = useState("right");

  const [isMuted, setIsMuted] = useState(false);

  // useEffect(() => {
  //   const handleClick = (index) => {
  //     setDisplayText(audios[index].name);
  //     setCurrentSrc(audios[index].src);
  //     audioRef.current.play();
  //   };
  // }, []);

  const handleClick = (index) => {
    setDisplayText(audios[index].name);
    setCurrentSrc(audios[index].src);

    audioRef.current.play();
  };

  const toggleMute = () => {
    const audioElement = audioRef.current;
    audioElement.muted = !audioElement.muted;
    setIsMuted(!isMuted);
    if (power === "right") setPower("left");
    if (power === "left") setPower("right");
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  return (
    <div className="App">
      <div id="drum-machine" className="container">
        <div className="row">
          <div className="col-7 drums">
            {audios.map((audio, index) => {
              return (
                <button
                  key={index}
                  id={audio.key}
                  className="drum-pad"
                  onClick={() => handleClick(index)}
                >
                  {audio.key.toUpperCase()}
                </button>
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
            <figure>
              <figcaption id="display" className="text-center">
                {displayText}
              </figcaption>
              <audio ref={audioRef} src={currentSrc}>
                <a href={currentSrc}>Download audio</a>
              </audio>
            </figure>
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
