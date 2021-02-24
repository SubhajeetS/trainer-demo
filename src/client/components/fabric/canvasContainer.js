import React, { useRef, useEffect, useState } from "react";
import DrawableCanvas from "./drawableCanvas";

const MAIN_CONTAINER = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
};

const CANVAS_CONTAINER = {
  position: "absolute",
};

const DEFAULT_WIDTH = 680;
const DEFAULT_HEIGHT = 480;
const DEFAULT_TOP = 0;
const DEFAULT_LEFT = 0;

export default function CanvasContainer({
  videoWidth = DEFAULT_WIDTH,
  videoHeight = DEFAULT_HEIGHT,
  isDrawing
}) {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({});
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
  });
  const [canvasPosition, setCanvasPosition] = useState({
    top: DEFAULT_TOP,
    left: DEFAULT_LEFT,
  });

  //TODO: add window resize handler like this:
  //https://stackoverflow.com/questions/43817118/how-to-get-the-width-of-a-react-element
  useEffect(() => {
    const { offsetWidth: width, offsetHeight: height } = containerRef.current;
    setDimensions({ width, height });
  }, [containerRef.current]);

  useEffect(() => {
    const videoAspectRatio = videoWidth / videoHeight;
    const width = dimensions.width;
    const height = dimensions.width / videoAspectRatio;

    const top = (dimensions.height - height) / 2;

    setCanvasPosition({
      top,
      left: DEFAULT_LEFT,
    });

    setCanvasDimensions({ width, height });
  }, [dimensions, videoWidth, videoHeight]);

  return (
    <div style={MAIN_CONTAINER} ref={containerRef}>
      <div style={{ ...CANVAS_CONTAINER, ...canvasPosition, ...canvasDimensions }}>
        <DrawableCanvas dimensions={canvasDimensions} isDrawing={isDrawing} />
      </div>
    </div>
  );
}
