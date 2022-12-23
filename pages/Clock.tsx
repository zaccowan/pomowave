import React, { useCallback, useEffect, useMemo, useState } from "react";

function Clock() {
  const [timerActive, setTimerActive] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [seconds, setSeconds] = useState(20);
  const [minutes, setMinutes] = useState(0);

  const adjustTime = useCallback(() => {
    if (minutes >= 0 && seconds >= 0) {
      if (seconds == 0) {
        setMinutes(minutes - 1);
        setSeconds(60);
      } else {
        setSeconds(seconds - 1);
      }
    }
    if (minutes == 0 && seconds == 0) {
      setTimerActive(false);
      setTimeUp(true);
    }
  }, [seconds, minutes]);

  useEffect(() => {
    const id = timerActive
      ? setInterval(() => adjustTime, 1000)
      : setInterval(() => setSeconds((currentSec) => currentSec), 1000);

    return () => {
      clearInterval(id);
    };
  }, [timerActive, adjustTime]);

  return (
    <div>
      <h1
        className={`${
          timerActive ? "text-9xl" : "text-6xl"
        } transition-all text-6xl font-bold px-20 py-20`}
      >
        {`${
          minutes < 10 ? `0${minutes} : ${seconds}` : `${minutes} : ${seconds}`
        }`}
      </h1>
      <h1
        onClick={() => setTimerActive(!timerActive)}
        className={`${
          !timerActive ? "bg-green-400" : "bg-red-400"
        } transition-all duration-700 px-4 py-10 rounded-xl cursor-pointer flex items-center justify-center uppercase text-white font-extrabold text-4xl`}
      >{`${!timerActive ? "start" : "stop"}`}</h1>
    </div>
  );
}

export default Clock;
