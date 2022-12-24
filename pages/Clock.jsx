import React, { useCallback, useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import useSound from "use-sound";
import CanvasBG from "./CanvasBG";

function Clock({ setPomodoroTime }) {
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
      <CanvasBG />
      {/* <div className="-z-10 absolute top-0 bottom-0 left-0 right-0 bg-white">
        <div class="custom-shape-divider-bottom-1671858560">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              class="shape-fill"
            ></path>
            <path
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
              class="shape-fill"
            ></path>
          </svg>
        </div>
      </div> */}

      <div
        className={`transition-all duration-500 ease-in-out w-full h-screen flex flex-col flex-1 items-center justify-end sm:justify-center ${
          timerDone && showAlarmBG ? "bg-red-400 opacity-0" : "bg-white/0"
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
