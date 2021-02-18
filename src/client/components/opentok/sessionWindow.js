import React, { useState, useEffect, useMemo } from "react";
import { OTPublisher, OTSubscriber, createSession } from "opentok-react";

const SESSION_CONTAINER = {
  flex: 1,
  backgroundColor: "black",
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
  width: "100%"
}

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
        onStreamsUpdated: setStreams,
      }),
    [apiKey, sessionId, token]
  );

  useEffect(() => {
    return () => {
      sessionHelper.disconnected();
    };
  }, [apiKey, sessionId, token]);

  return (
    <div style={CONNECTED}>
      {error ? <SessionError error={error} /> : null}
      <OTPublisher style={CONNECTED} properties={{ width: '100%', height: '100%' }} session={sessionHelper.session} />
      {streams.map((stream) => (
        <OTSubscriber
          key={stream.id}
          session={sessionHelper.session}
          stream={stream}
        />
      ))}
    </div>
  );
};

export function SessionWindow({ session }) {
  return (
    <div style={SESSION_CONTAINER}>
      {session ? <SessionConnected session={session} /> : <SessionConnecting />}
    </div>
  );
}
