import React, { useMemo, useState, useRef, useEffect } from "react";
import { OTPublisher, OTSubscriber } from "opentok-react";
import getFilteredCanvas from "./canvas";
import initCanvas from "../fabric/fabricCanvas";

const SESSION_CONTAINER = {
  flex: 1,
  backgroundColor: "black",
};

const CALL_CONTAINER = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
  position: "relative",
};

const COL = {
  flex: 1,
};

const CONNECTING = {
  color: "white",
  textAlign: "center",
  alignItems: "stretch",
};

const CONNECTED = {
  flex: 1,
  alignItems: "stretch",
  height: "100%",
  width: "100%",
  position: "relative",
};

const CANVAS = {
  position: "absolute",
  top: 290,
  left: 0,
  width: "100%",
  height: "440px",
};

const PIP = {
  position: "absolute",
  width: "270px",
  height: "200px",
  bottom: "10px",
  left: "10px",
  zIndex: 100,
  borderWidth: "3px",
  borderColor: "white",
  bordeRadius: "3px",
  borderStyle: "solid",
};

const SessionConnected = ({ sessionHelper, streams }) => {
  const [showFeed, setShowFeed] = useState(false);
  const [publisherFeedOption, setPublisherFeedOption] = useState({});
  const videoRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    console.log("------------canvas resizing-------------------");
    if (canvasRef.current) {
      //set canvas properties
      canvasRef.current.style.width = "100%";
      // canvasRef.current.style.height = "100%";
      //then set the internal size to match
      canvasRef.current.width = canvasRef.current.offsetWidth;
      // canvasRef.current.height = canvasRef.current.offsetHeight;
    }
  });

  useEffect(() => {
    console.log("------------video resizing-------------------");
    if (videoRef.current) {
      //set canvas properties
      videoRef.current.style.width = "100%";
      videoRef.current.style.height = "100%";
      //then set the internal size to match
      videoRef.current.width = videoRef.current.offsetWidth;
      videoRef.current.height = videoRef.current.offsetHeight;
    }
  });

  const eventHandlers = useMemo(
    () => ({
      videoElementCreated: (event) => {
        console.log("-----------video element created-------------------");
        console.log(
          `width = ${event.element.videoWidth}, height=${event.element.videoHeight}`
        );
        //create the fabric canvas
        event.element.addEventListener("resize", function resize() {
          console.log(
            `width = ${event.element.videoWidth}, height=${event.element.videoHeight}`
          );
        });

        const fabricCanvas = initCanvas(canvasRef.current);

        const filteredCanvas = getFilteredCanvas(
          event.element,
          [fabricCanvas.lowerCanvasEl, fabricCanvas.upperCanvasEl],
          canvasRef.current.width,
          canvasRef.current.height
        );

        const publisherOptions = {
          insertMode: "append",
          width: "100%",
          height: "100%",
          // Pass in the canvas stream video track as our custom videoSource
          // videoSource: filteredCanvas.canvas
          //   .captureStream(30)
          //   .getVideoTracks()[0],
          // Pass in the audio track from our underlying mediaStream as the audioSource
          // audioSource: mediaStream.getAudioTracks()[0]
        };
        // setPublisherFeedOption(publisherOptions);
        //setShowFeed(true);

        //stream to video
        const stream = filteredCanvas.canvas.captureStream(30);
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      },
      destroyed: () => {
        console.log("-----------video element destroyed-------------------");
      },
    }),
    []
  );

  //more than 1 user
  let PUBLISHER_VIDEO = { ...CONNECTED, ...PIP };

  return (
    <div style={CALL_CONTAINER}>
      <OTPublisher
        style={PUBLISHER_VIDEO}
        properties={{
          width: "100%",
          height: "100%",
          fitMode: "contain",
          frameRate: 30,
          resolution: "1280x720",
        }}
        session={sessionHelper.session}
      />
      <div style={CONNECTED}>
        <video ref={videoRef}></video>
      </div>
      {streams.length >= 1 &&
        streams.map((stream) => (
          <div style={CONNECTED}>
            <OTSubscriber
              style={CONNECTED}
              properties={{
                width: "100%",
                height: "100%",
                preferredFrameRate: 30,
                fitMode: "contain",
                preferredResolution: {
                  height: 720,
                  width: 1280,
                },
              }}
              eventHandlers={eventHandlers}
              key={stream.id}
              session={sessionHelper.session}
              stream={stream}
            />
            <canvas
              ref={canvasRef}
              width="640"
              height="440"
              style={CANVAS}
            ></canvas>
          </div>
        ))}
    </div>
  );
};

export function CallWindow(props) {
  return (
    <div style={SESSION_CONTAINER}>
      <SessionConnected {...props} />
    </div>
  );
}
