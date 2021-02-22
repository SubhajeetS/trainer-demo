import { fabric } from "fabric";

export default function initCanvas(elem) {
  //initialize canvas element
  const canvas = new fabric.Canvas(elem, {
    isDrawingMode: true,
  });

  fabric.Object.prototype.transparentCorners = false;

  //initialize the stroke type
  canvas.freeDrawingBrush = new fabric["PencilBrush"](canvas);

  //set brush properties
  const brush = canvas.freeDrawingBrush;
  brush.color = "black";
  if (brush.getPatternSrc) {
    brush.source = brush.getPatternSrc.call(brush);
  }
  brush.width = 3;
  brush.shadow = new fabric.Shadow({
    blur: 0,
    offsetX: 0,
    offsetY: 0,
    affectStroke: true,
    color: "black",
  });

  return canvas;
}
