import React, { useRef, useEffect } from "react";
import initCanvas from "./fabricCanvas";

export default React.forwardRef(function DrawableCanvas(
  props,
  fabricCanvasRef
) {
  const { dimensions, isDrawing = false } = props;
  const canvasRef = useRef(null);
  const { width = 640, height = 480 } = dimensions;

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.isDrawingMode = isDrawing;
      //TODO: find a better way
      if(!isDrawing) {
        fabricCanvasRef.current.clear();
      }
    }
  }, [isDrawing]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setWidth(width);
      fabricCanvasRef.current.setHeight(height);
    }
  }, [width, height]);

  //remove fabric Canvas instance
  const cleanup = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }
  };

  useEffect(() => {
    if (fabricCanvasRef.current) {
      cleanup();
    }
    fabricCanvasRef.current = initCanvas(canvasRef.current, isDrawing);
    return cleanup;
  }, [canvasRef.current]);

  return <canvas ref={canvasRef} width={width} height={height} />;
});
