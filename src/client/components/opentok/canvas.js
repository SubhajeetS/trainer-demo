import Filters from "./filters";

export default function getFilteredCanvas(videoEl, WIDTH = 640, HEIGHT = 480) {
    const mediaStream = videoEl.srcObject;
    // var videoEl = document.createElement('video');
    // videoEl.srcObject = mediaStream;
    // videoEl.setAttribute('playsinline', '');
    // videoEl.muted = true;
    // setTimeout(function timeout() {
    //   videoEl.play();
    // });
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    var tmpCanvas = document.createElement('canvas');
    var tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width = WIDTH;
    tmpCanvas.height = HEIGHT;
    tmpCtx.fillStyle = 'rgb(200, 0, 0)';
    tmpCtx.fillRect(10, 10, 50, 50);

    tmpCtx.fillStyle = 'rgba(0, 0, 200, 0.5)';
    tmpCtx.fillRect(30, 30, 50, 50);

    videoEl.addEventListener('resize', function resize() {
      canvas.width = tmpCanvas.width = videoEl.videoWidth;
      canvas.height = tmpCanvas.height = videoEl.videoHeight;
    });

    var reqId;

    // Draw each frame of the video
    var drawFrame = function drawFrame() {
      // Draw the video element onto the temporary canvas and pull out the image data
      // tmpCtx.drawImage(videoEl, 0, 0, tmpCanvas.width, tmpCanvas.height);
      // var imgData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
      // // Apply the currently selected filter and get the new image data
      // imgData = Filters.sepia(imgData);
      // // Draw the filtered image data onto the main canvas
      // ctx.putImageData(imgData, 0, 0);
      ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height); 
      // var imgData = tmpCtx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height);
      // ctx.putImageData(imgData, 0, 0); 

      reqId = requestAnimationFrame(drawFrame);
    };

    reqId = requestAnimationFrame(drawFrame);

    return {
      canvas: canvas,
      stop: function stop() {
        // Stop the video element, the media stream and the animation frame loop
        videoEl.pause();
        if (mediaStream.stop) {
          mediaStream.stop();
        }
        if (MediaStreamTrack && MediaStreamTrack.prototype.stop) {
          // Newer spec
          mediaStream.getTracks().forEach(function each(track) { track.stop(); });
        }
        cancelAnimationFrame(reqId);
      }
    };
  };