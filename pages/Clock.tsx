import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useSound from "use-sound";
import CanvasBG from "./CanvasBG";

function Clock({
  setPomodoroTime,
}: {
  setPomodoroTime: Dispatch<SetStateAction<number>>;
}) {
  const [timerActive, setTimerActive] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [totalTime, setTotalTime] = useState(seconds + minutes * 60);
  const [showAlarmBG, setShowAlarmBG] = useState(true);
  const [displayTimeSettings, setDisplayTimeSettings] = useState(false);
  const [play, { stop }] = useSound("EarlyRiser.mp3");

  const resetTimer = useCallback(() => {
    setTotalTime(seconds + minutes * 60);
    setTimerActive(false);
    setTimerDone(false);
    stop();
  }, [seconds, minutes, stop]);

  useEffect(() => {
    resetTimer();
  }, [minutes, seconds, resetTimer]);

  //Sending State back to Head
  useEffect(() => {
    setPomodoroTime(totalTime);
  }, [totalTime, setPomodoroTime]);

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
    <main className="overflow-hidden">
      <CanvasBG timerActive={timerActive} />

      <div
        className={`transition-all duration-500 ease-in-out w-full h-screen flex flex-col flex-1 items-center justify-end sm:justify-center ${
          timerDone && showAlarmBG ? "bg-red-400 opacity-50" : "bg-white/0"
        } `}
      >
        {/*
         * Display Edit Clock Overlay
         */}
        {displayTimeSettings && (
          <div className="z-50 absolute top-48 bottom-48 left-48 right-48 flex flex-col space-y-8 items-center justify-center rounded-xl bg-black/30 backdrop-blur-lg">
            <div
              onClick={() => setDisplayTimeSettings(!displayTimeSettings)}
              className="absolute top-5 right-5 cursor-pointer"
            >
              <XCircleIcon
                width={72}
                height={72}
                className="opacity-90 text-red-400 drop-shadow-md"
              />
            </div>
            <form className="space-y-4">
              <div className="flex space-x-4">
                <h1 className="text-white text-6xl font-bold">Minutes</h1>
                <input
                  required={true}
                  name="minutes"
                  onChange={(e) => {
                    setMinutes(e.target.valueAsNumber);
                  }}
                  type="number"
                  defaultValue={25}
                  min="0"
                  max="60"
                  className="bg-transparent border-4 outline-none rounded-xl text-center text-3xl py-4 font-bold text-white scroll-none"
                />
              </div>
              <div className="flex space-x-4">
                <h1 className="text-white text-6xl font-bold">Seconds</h1>
                <input
                  name="seconds"
                  onChange={(e) => {
                    setSeconds(e.target.valueAsNumber);
                  }}
                  required={true}
                  type="number"
                  defaultValue={0}
                  min="0"
                  max="60"
                  className="bg-transparent border-4 outline-none rounded-xl text-center text-3xl py-4 font-bold text-white"
                />
              </div>
            </form>
          </div>
        )}

        {/*
         * Display Time
         */}
        <h1
          onClick={() => setDisplayTimeSettings(!displayTimeSettings)}
          className={`${
            timerActive ? "text-9xl" : "text-6xl"
          } transition-all font-bold px-20 py-20 cursor-pointer rounded-xl bg-gray-400/10 hover:bg-gray-400/30 hover:scale-105 hover:shadow-lg backdrop-blur-sm m-4`}
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

        <div className="w-full sm:w-8/12 flex items-center justify-center flex-col sm:flex-row z-40">
          {!timerDone && (
            <h1
              onClick={() => setTimerActive(!timerActive)}
              className={`w-full sm:w-1/2 transition-all duration-700 px-4 py-10 xs: sm:rounded-l-xl cursor-pointer flex items-center justify-center 
          uppercase text-white font-extrabold text-4xl
          ${
            !timerActive
              ? "bg-green-400 hover:bg-green-500"
              : "bg-red-400 hover:bg-red-500"
          } 
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
          uppercase text-white font-extrabold text-4xl bg-yellow-400 hover:bg-yellow-500 text-center
        `}
          >
            Restart Timer
          </h1>
        </div>
      </div>
    </main>
  );
}

export default Clock;
