import React, { useState, useMemo } from "react";
import { OTSession, OTStreams } from "opentok-react";

import Publisher from "./publisher";
import Subscriber from "./subscriber";

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

const SessionConnecting = () => (
  <div style={{ ...COL, ...CONNECTING }}> Connecting...</div>
);

const SessionError = ({error}) => (
  <div style={{ ...COL, ...CONNECTING }}> {`Error Connecting : ${error.message}`} </div>
);

const SessionConnected = ({ session }) => {
  const { apiKey, sessionId, token } = session;
  const [error, setError] = useState();
  const [connected, setconnected] = useState(false);
  
  const sessionEvents = useMemo(
    () => ({
      sessionConnected: () => {
        setconnected(true);
      },
      sessionDisconnected: () => {
        setconnected(false);
      },
    }),
    []
  );

  return (
    <OTSession
      apiKey={apiKey}
      sessionId={sessionId}
      token={token}
      eventHandlers={sessionEvents}
      onError={setError}
    >
      {error ? <SessionError error={error}/> : null}
      <Publisher />
      <OTStreams>
        <Subscriber />
      </OTStreams>
    </OTSession>
  );
};

export function SessionWindow({ session }) {
  return (
    <div style={SESSION_CONTAINER}>
      {session ? <SessionConnected session={session} /> : <SessionConnecting />}
    </div>
  );
}
