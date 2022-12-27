import React, { useEffect, useRef, useState } from "react";
import { Leva, useControls } from "leva";

const isBrowser = typeof window !== "undefined" ? true : false;

type windowSize = {
  width?: number;
  height?: number;
};

function CanvasBG({
  timerActive,
  timeRemaining,
  totalTime,
}: {
  timerActive: boolean;
  timeRemaining: number;
  totalTime: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined,
  });

  const [percentComplete, setPercentComplete] = useState(
    timeRemaining / totalTime
  );

  useEffect(() => {
    setPercentComplete(timeRemaining / totalTime);
  }, [timeRemaining, totalTime, setPercentComplete]);

  const { yOffset, amplitude, length, frequency } = useControls({
    yOffset: {
      value: 0.85,
      min: 0,
      max: 1,
      step: 0.0001,
    },
    amplitude: {
      value: 30,
      min: -600,
      max: 600,
      step: 1,
    },
    length: {
      value: 0.01,
      min: -0.01,
      max: 0.01,
      step: 0.001,
    },
    frequency: {
      value: 0.02,
      min: -1,
      max: 1,
      step: 0.01,
    },
  });

  //Get window properties
  useEffect(() => {
    if (isBrowser) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [windowSize.height, windowSize.width]);

  const ref = useRef({ prevIncrement: 0 });

  //Canvas Simulation
  useEffect(() => {
    //Canvas Setup
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const c = canvas.getContext("2d");
    if (!c || c === null) {
      return;
    }
    if (!windowSize.height || !windowSize.width) {
      return;
    }

    var increment = ref.current.prevIncrement;
    function animate() {
      window.requestAnimationFrame(animate);
      if (!windowSize.height || !windowSize.width) {
        return;
      }

      c?.clearRect(0, 0, windowSize.width, windowSize.height);
      c?.beginPath();
      c?.moveTo(0, windowSize.height * (yOffset * percentComplete));
      for (let i = 0; i < windowSize.width; i++) {
        c?.lineTo(
          i,
          windowSize.height * (yOffset * percentComplete) +
            Math.sin(i * length + increment) * amplitude * Math.sin(increment)
        );
      }
      c?.lineTo(windowSize.width, windowSize.height);
      c?.lineTo(0, windowSize.height);
      c?.lineTo(0, windowSize.height * (yOffset * percentComplete));
      c!.fillStyle = !timerActive
        ? `rgba(248, 113, 113, 1)`
        : `rgb(74, 222, 128, 1)`;
      c?.fill();

      // console.log(increment);
      increment += frequency;
      ref.current.prevIncrement = increment;
    }

    animate();
  }, [
    windowSize.height,
    windowSize.width,
    yOffset,
    amplitude,
    length,
    frequency,
    timerActive,
    percentComplete,
  ]);

  return (
    <>
      <Leva hidden />
      <canvas
        ref={canvasRef}
        className="-z-10 absolute top-0 bottom-0 right-0 left-0"
        width={windowSize.width}
        height={windowSize.height}
      />
    </>
  );
}

export default CanvasBG;
