import React, { useEffect, useRef, useState } from "react";
import { useControls } from "leva";

const isBrowser = typeof window !== "undefined" ? true : false;

type windowSize = {
  width?: number;
  height?: number;
};

function CanvasBG({ timerActive }: { timerActive: boolean }) {
  console.log(timerActive);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [windowSize, setWindowSize] = useState<windowSize>({
    width: undefined,
    height: undefined,
  });
  const [tick, setTick] = useState(0);

  const { yPos, amplitude, length, frequency } = useControls({
    yPos: {
      value: 500,
      min: 0,
      max: windowSize.height,
      step: 0.1,
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

  //Get window width and height
  useEffect(() => {
    if (isBrowser) {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [windowSize.height, windowSize.width]);

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

    var increment = frequency;

    function animate() {
      window.requestAnimationFrame(animate);
      if (!windowSize.height || !windowSize.width) {
        return;
      }

      c?.clearRect(0, 0, windowSize.width, windowSize.height);
      c?.beginPath();
      c?.moveTo(0, yPos);
      for (let i = 0; i < windowSize.width; i++) {
        c?.lineTo(
          i,
          yPos +
            Math.sin(i * length + increment) * amplitude * Math.sin(increment)
        );
      }
      c?.lineTo(windowSize.width, windowSize.height);
      c?.lineTo(0, windowSize.height);
      c?.lineTo(0, yPos);
      c!.fillStyle = `rgba(248,113,113,1)`;
      c!.strokeStyle = `rgba(248,113,113,1)`;
      c?.stroke();
      c?.fill();

      increment += frequency;
    }

    animate();
  }, [
    windowSize.height,
    windowSize.width,
    yPos,
    amplitude,
    length,
    frequency,
    timerActive,
  ]);

  return (
    <>
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
