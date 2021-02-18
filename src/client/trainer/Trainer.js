import React, { useEffect, useState } from 'react';
import { getSession } from "../services";
import { SessionWindow, Sidebar } from "../components";

const CONTAINER = {
  display: "flex",
  height: "100%"
}

export default function Trainer() {
  const [session, setSession] = useState();

  useEffect(() => {
    getSession().then(session => {
      console.log(`session: ${session}`);
      setSession(session);
    })
  }, [])

  return (
    <div style={CONTAINER}>
      <SessionWindow session={session} />
      <Sidebar />
    </div>
  );
}
