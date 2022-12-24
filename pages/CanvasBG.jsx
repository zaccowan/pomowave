import React, { useEffect, useRef } from "react";

function CanvasBG(window) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
  }, []);

  console.log(window.innerWidth);
  return (
    <canvas
      ref={canvasRef}
      className="-z-10 absolute top-0 bottom-0 left-0 right-0 w-full h-screen"
    />
  );
}

export default CanvasBG;
