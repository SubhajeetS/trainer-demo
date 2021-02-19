import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { SessionWindow, Sidebar } from "../components";

const CONTAINER = {
  display: "flex",
  height: "100%"
}

export default function Trainer() {
  const session = useSelector(state => state.meeting.session);

  return (
    <div style={CONTAINER}>
      <SessionWindow session={session} />
      <Sidebar />
    </div>
  );
}
