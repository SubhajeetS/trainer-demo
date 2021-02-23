import { fabric } from "fabric";

export default function initCanvas(elem) {
  //initialize canvas element
  const canvas = new fabric.Canvas(elem, {
    isDrawingMode: true,
    objectCaching: false
  });

  fabric.Object.prototype.transparentCorners = false;

  //initialize the stroke type
  canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

  //set brush properties
  canvas.freeDrawingBrush.color = "red";
  // if (brush.getPatternSrc) {
  //   brush.source = brush.getPatternSrc.call(brush);
  // }
  canvas.freeDrawingBrush.width = 2;

  return canvas;
}
