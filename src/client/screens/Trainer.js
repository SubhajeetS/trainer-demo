import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { CallWindow, Sidebar } from "../components";
import useSession from "../components/opentok/useSession.js";

const CONTAINER = {
  display: "flex",
  height: "100%"
}

export default function Trainer() {
  const session = useSelector(state => state.meeting.session);
  const { sessionHelper, streams } = useSession(session);

  const sendCommand = (command) => {
    sessionHelper.session.signal({
      data: JSON.stringify(command)
    }, err => {
      if(err) {
        console.error(`error sending signal ( ${err.name}, ${err.message} )`)
      }
    })
  }

  return (
    <div style={CONTAINER}>
      <CallWindow sessionHelper={sessionHelper} streams={streams} />
      <Sidebar sendCommand={sendCommand}/>
    </div>
  );
}
