import React from "react";
import { Button } from "react-bootstrap";

export default function Playlist({ sendSignal }) {

  const jump = () => sendCommand('JUMP');
  const stop = () => sendCommand('STOP');

  return (
    <div>
      <h4> Your Fancy Controls</h4>
      <Button variant="dark" onClick={jump}>
        Jump
      </Button>
      <Button variant="dark" onClick={stop}>
        Stop
      </Button>
    </div>
  );
}
