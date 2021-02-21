import React, { useMemo, useState } from "react";
import { OTPublisher, OTSubscriber } from "opentok-react";
import getFilteredCanvas from "./canvas";

const SESSION_CONTAINER = {
  flex: 1,
  backgroundColor: "black",
};

const CALL_CONTAINER = {
  display: "flex",
  flexDirection: "row",
  height: "100%",
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

  const eventHandlers = useMemo(
    () => ({
      videoElementCreated: (event) => {
        console.log("-----------video element create-------------------");
        console.log(event.element);
        const mediaStream = event.element.srcObject;
        const filteredCanvas = getFilteredCanvas(mediaStream);

        const publisherOptions = {
          insertMode: "append",
          width: "100%",
          height: "100%",
          // Pass in the canvas stream video track as our custom videoSource
          videoSource: filteredCanvas.canvas
            .captureStream(30)
            .getVideoTracks()[0],
          // Pass in the audio track from our underlying mediaStream as the audioSource
          // audioSource: mediaStream.getAudioTracks()[0]
        };
        setPublisherFeedOption(publisherOptions);
        setShowFeed(true);
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
      {showFeed && (
        <OTPublisher
          style={CONNECTED}
          properties={publisherFeedOption}
          session={sessionHelper.session}
        />
      )}
      {streams.length >= 1 &&
        streams.map((stream) => (
          <OTSubscriber
            style={CONNECTED}
            properties={{
              width: "100%",
              height: "100%",
              fitMode: "contain",
              preferredFrameRate: 30,
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
