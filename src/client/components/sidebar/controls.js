import React from "react";
import Button from "react-bootstrap/button";

export default function Playlist({ sendSignal }) {
  return (
    <div>
      <h4> Your Fancy Controls</h4>
      <Button variant="dark" onClick={sendSignal}>
        Send Signal
      </Button>
    </div>
  );
}
