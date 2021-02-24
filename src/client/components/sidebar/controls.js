import React from "react";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";

export default function Playlist({ sendCommand, isDrawing, toggleDrawing }) {
  const jump = () => sendCommand("JUMP");
  const stop = () => sendCommand("STOP");

  const ROW = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  };

  return (
    <div>
      <h4> Your Fancy Controls</h4>
      <Row style={ROW}>
        <Col>
          <Button variant="dark" onClick={jump}>
            Jump
          </Button>
        </Col>
        <Col>
          <Button variant="dark" onClick={stop}>
            Stop
          </Button>
        </Col>
      </Row>
      <Row style={ROW}>
        <Col>
          <Button variant="dark" onClick={toggleDrawing}>
            {isDrawing ? "Stop Drawing" : "Start Drawing"}
          </Button>
        </Col>
      </Row>
    </div>
  );
}
