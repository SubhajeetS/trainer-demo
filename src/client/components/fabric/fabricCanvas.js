import { fabric } from "fabric";

export default function initCanvas(elem, isDrawingMode) {
  //initialize canvas element
  const canvas = new fabric.Canvas(elem, {
    isDrawingMode,
    objectCaching: false
  });

  fabric.Object.prototype.transparentCorners = false;

  //initialize the stroke type
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

  //set brush properties
  canvas.freeDrawingBrush.color = "red";
  canvas.freeDrawingBrush.width = 1;

  return canvas;
}
