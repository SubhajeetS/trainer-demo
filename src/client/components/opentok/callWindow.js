import React, { useMemo, useState, useRef, useEffect } from "react";
import { OTPublisher, OTSubscriber } from "opentok-react";
import getFilteredCanvas from "./canvas";
import CanvasContainer from "../fabric/canvasContainer";

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

const CONNECTED = {
  flex: 1,
  alignItems: "stretch",
  height: "100%",
  width: "100%",
  position: "relative",
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

const DEFAULT_PUBLISHER_PROPS = {
  width: "100%",
  height: "100%",
  fitMode: "contain",
  frameRate: 30,
  resolution: "1280x720",
};

const SessionConnected = ({ sessionHelper, streams, isDrawing }) => {
  const [publisherProps, setPublisherProps] = useState(DEFAULT_PUBLISHER_PROPS);
  const [videoDimensions, setVideoDimensions] = useState({});

  const videoRef = useRef(null);
  const publisherRef = useRef(null);
  const canvasRef = useRef(null);
  const filteredCanvasRef = useRef(null);

  useEffect(() => {
    if (isDrawing) {
      filteredCanvasRef.current = getFilteredCanvas(videoRef.current, [
        canvasRef.current.lowerCanvasEl,
        canvasRef.current.upperCanvasEl,
      ]);

      //set new publisher options
      const publisherOptions = {
        ...DEFAULT_PUBLISHER_PROPS,
        // Pass in the canvas stream video track as our custom videoSource
        videoSource: filteredCanvasRef.current.canvas
          .captureStream(30)
          .getVideoTracks()[0],
        // Pass in the audio track from our underlying mediaStream as the audioSource
        // audioSource: mediaStream.getAudioTracks()[0]
      };
      setPublisherProps(publisherOptions);
    } else {
      if (filteredCanvasRef.current) {
        filteredCanvasRef.current.stop();
      }
      setPublisherProps(DEFAULT_PUBLISHER_PROPS);
    }
  }, [isDrawing]);

  useEffect(() => {
    console.log(`----------------streams updated----------------------`);
    if (streams && streams.length) {
      const first = streams[0];
      setVideoDimensions({
        videoHeight: first.videoDimensions.height,
        videoWidth: first.videoDimensions.width,
      });
    }
  }, [streams]);

  const eventHandlers = useMemo(
    () => ({
      videoElementCreated: (event) => {
        console.log("-----------video element created-------------------");
        videoRef.current = event.element;
      },
      destroyed: () => {
        console.log("-----------video element destroyed-----------------");
        videoRef.current = null;
      },
    }),
    []
  );

  //more than 1 user
  let PUBLISHER_VIDEO = CONNECTED;
  if (streams.length && !isDrawing) {
    PUBLISHER_VIDEO = { ...CONNECTED, ...PIP };
  }

  return (
    <div style={CALL_CONTAINER}>
      <OTPublisher
        ref={publisherRef}
        style={PUBLISHER_VIDEO}
        properties={publisherProps}
        session={sessionHelper.session}
      />
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
            <CanvasContainer
              {...videoDimensions}
              isDrawing={isDrawing}
              ref={canvasRef}
            />
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
