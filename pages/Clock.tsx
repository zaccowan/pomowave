import React, { useEffect, useState } from "react";
import useSound from "use-sound";

function Clock() {
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [seconds, setSeconds] = useState(14);
  const [minutes, setMinutes] = useState(1);
  const [totalTime, setTotalTime] = useState(seconds + minutes * 60);
  const [showAlarmBG, setShowAlarmBG] = useState(true);
  const [displayTimeSettings, setDisplayTimeSettings] = useState(false);
  const [play, { stop }] = useSound("EarlyRiser.mp3");

  useEffect(() => {
    const flash = setInterval(() => setShowAlarmBG(!showAlarmBG), 500);

    return () => {
      clearInterval(flash);
    };
  }, [timerDone, showAlarmBG]);

  useEffect(() => {
    if (!timerDone) {
      stop();
    }
  }, [timerDone, stop]);

  function resetTimer() {
    setTotalTime(seconds + minutes * 60);
    setTimerActive(false);
    setTimerDone(false);
    stop();
  }

  useEffect(() => {
    function decrementTime() {
      if (totalTime > 0) {
        setTotalTime((currentTime) => currentTime - 1);
      } else if (totalTime == 0) {
        setTimerActive(false);
        setTimerDone(true);
        play();
      }
    }

    const id = timerActive
      ? setInterval(() => decrementTime(), 1000)
      : setInterval(() => setTotalTime((currentTime) => currentTime), 1000);

    return () => {
      clearInterval(id);
    };
  }, [timerActive, totalTime, play]);

  return (
    <div
      className={`transition-all duration-500 ease-in-out w-full h-screen flex flex-col flex-1 items-center justify-end sm:justify-center ${
        timerDone && showAlarmBG ? "bg-red-400" : "bg-white"
      } `}
    >
      {displayTimeSettings && (
        <div
          onClick={() => setDisplayTimeSettings(!displayTimeSettings)}
          className="z-50 absolute top-5 bottom-5 left-5 right-5 flex items-center justify-center rounded-xl bg-gray-400/50 backdrop-blur-sm"
        >
          <div className="flex space-x-4">
            <h1 className="text-6xl font-bold">Minutes</h1>
            <input type="text" className="bg-transparent border-4 rounded-xl" />
          </div>
        </div>
      )}

      <h1
        onClick={() => setDisplayTimeSettings(!displayTimeSettings)}
        className={`${
          timerActive ? "text-9xl" : "text-6xl"
        } transition-all font-bold px-20 py-20 cursor-pointer rounded-xl bg-gray-400/10 backdrop-blur-sm m-4`}
      >
        {`
          ${
            totalTime / 60 < 10
              ? `0${Math.floor(totalTime / 60)} :`
              : `${Math.floor(totalTime / 60)} :`
          }
          ${totalTime % 60 < 10 ? ` 0${totalTime % 60}` : ` ${totalTime % 60}`} 
        `}
      </h1>

      <div className="w-full sm:w-8/12 flex items-center justify-center flex-col sm:flex-row">
        {!timerDone && (
          <h1
            onClick={() => setTimerActive(!timerActive)}
            className={`w-full sm:w-1/2 transition-all duration-700 px-4 py-10 xs: sm:rounded-l-xl cursor-pointer flex items-center justify-center 
          uppercase text-white font-extrabold text-4xl
          ${!timerActive ? "bg-green-400" : "bg-red-400"} 
        `}
          >
            {`${!timerActive ? "start" : "stop"}`}
          </h1>
        )}
        <h1
          onClick={() => resetTimer()}
          className={`w-full sm:w-1/2 transition-all duration-700 px-4 py-10 ${
            timerDone ? "sm:w-full sm:rounded-xl" : "sm:rounded-r-xl"
          }  cursor-pointer flex items-center justify-center 
          uppercase text-white font-extrabold text-4xl bg-yellow-400 text-center
        `}
        >
          Restart Timer
        </h1>
      </div>
    </div>
  );
}

export default Clock;
