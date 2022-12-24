import React, { useEffect, useRef, useState } from "react";

const isBrowser = typeof window !== "undefined" ? true : false;

type windowSize = {
  responsiveWidth?: number;
  responsiveHeight?: number;
};

function CanvasBG() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [windowSize, setWindowSize] = useState<windowSize>({
    responsiveWidth: undefined,
    responsiveHeight: undefined,
  });

  useEffect(() => {
    if (isBrowser) {
      setWindowSize({
        responsiveWidth: window.innerWidth,
        responsiveHeight: window.innerHeight,
      });
    }
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }
    if (!windowSize.responsiveHeight || !windowSize.responsiveWidth) {
      return;
    }
    context.fillRect(
      0,
      0,
      windowSize.responsiveWidth / 2,
      windowSize.responsiveHeight / 2
    );
  }, [windowSize.responsiveHeight, windowSize.responsiveWidth]);

  return (
    <canvas
      onClick={() => {
        console.log(windowSize.responsiveHeight);
      }}
      ref={canvasRef}
      className="-z-10 absolute"
      width={windowSize.responsiveWidth}
      height={windowSize.responsiveHeight}
    />
  );
}

export default CanvasBG;
