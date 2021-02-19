import React, { useState, useEffect, useMemo } from "react";
import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

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

const SessionConnecting = () => (
  <div style={{ ...COL, ...CONNECTING }}> Connecting...</div>
);

const SessionError = ({ error }) => (
  <div style={{ ...COL, ...CONNECTING }}>
    {" "}
    {`Error Connecting : ${error.message}`}{" "}
  </div>
);

const SessionConnected = ({ session }) => {
  const { apiKey, sessionId, token } = session;
  const [error, setError] = useState();
  const [streams, setStreams] = useState([]);

  const sessionHelper = useMemo(
    () =>
      createSession({
        apiKey,
        sessionId,
        token,
        onStreamsUpdated: (streams) => {
          setStreams([...streams]);
        },
      }),
    [apiKey, sessionId, token]
  );

  useEffect(() => {
    return () => {
      sessionHelper.disconnect();
    };
  }, [apiKey, sessionId, token]);

  //more than 1 user
  let PUBLISHER_VIDEO = { ...CONNECTED };
  if (streams.length > 1) {
    PUBLISHER_VIDEO = { ...PUBLISHER_VIDEO, ...PIP };
  }

  return (
    <>
      {error ? <SessionError error={error} /> : null}
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
              key={stream.id}
              session={sessionHelper.session}
              stream={stream}
            />
          ))}
      </div>
    </>
  );
};

export function SessionWindow({ session }) {
  return (
    <div style={SESSION_CONTAINER}>
      {session ? <SessionConnected session={session} /> : <SessionConnecting />}
    </div>
  );
}
