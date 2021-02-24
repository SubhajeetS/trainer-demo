export default function getFilteredCanvas(videoEl, canvases, WIDTH = 640, HEIGHT = 480) {
  const mediaStream = videoEl.srcObject;

  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  videoEl.addEventListener("resize", function resize() {
    canvas.width = videoEl.videoWidth;
    canvas.height = videoEl.videoHeight;
  });

  var reqId;

  // Draw each frame of the video
  var drawFrame = function drawFrame() {
    ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
    canvases.forEach(c => {
      ctx.drawImage(c, 0, 0, canvas.width, canvas.height);
    })
    reqId = requestAnimationFrame(drawFrame);
  };

  reqId = requestAnimationFrame(drawFrame);

  return {
    canvas: canvas,
    stop: function stop() {
      cancelAnimationFrame(reqId);
    },
  };
}
