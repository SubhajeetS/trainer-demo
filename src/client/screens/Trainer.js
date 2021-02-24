import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CallWindow, Sidebar } from "../components";
import useSession from "../components/opentok/useSession.js";
import { Toast } from "react-bootstrap";

const CONTAINER = {
  display: "flex",
  height: "100%",
};

const TOAST = {
  position: "absolute",
  backgroudColor: "#FDECDC",
  top: 10,
  right: "50%",
  width: "100%",
  zIndex: 1,
};

const TOAST_HEADER = {
  backgroundColor: "#fff3cd",
};

const TOAST_BODY = {
  backgroundColor: "#fff3cd",
};

export default function Trainer() {
  const meetingDetails = useSelector((state) => state.meeting.session);
  const { sessionHelper, streams } = useSession(meetingDetails);
  const [isToastVisible, setToastVisibility] = useState(false);
  const [command, setCommand] = useState("");
  const [isDrawing, setIsDrawing] = useState(undefined);

  useEffect(() => {
    sessionHelper.session.on("signal:command", (event) => {
      const myConnectionId = sessionHelper.session.connection && sessionHelper.session.connection.id;
      // Signal received from another client
      if (myConnectionId && event.from.connectionId != myConnectionId) {
        setCommand(event.data);
        setToastVisibility(true);
      }
    });
  }, [sessionHelper.session]);

  const sendCommand = (command) => {
    sessionHelper.session.signal(
      {
        data: command,
        type: "command",
      },
      (err) => {
        if (err) {
          console.error(`error sending signal ( ${err.name}, ${err.message} )`);
        }
      }
    );
  };

  const toggleDrawing = () => setIsDrawing(!isDrawing);

  return (
    <div style={CONTAINER}>
      <Toast
        style={TOAST}
        onClose={() => setToastVisibility(false)}
        show={isToastVisible}
        autohide
        delay={1000}
      >
        <Toast.Header style={TOAST_HEADER}>
          <strong className="mr-auto">Trainer Says</strong>
        </Toast.Header>
        <Toast.Body style={TOAST_BODY}> {command}</Toast.Body>
      </Toast>
      <CallWindow sessionHelper={sessionHelper} streams={streams} isDrawing={isDrawing}/>
      <Sidebar sendCommand={sendCommand} toggleDrawing={toggleDrawing} isDrawing={isDrawing}/>
    </div>
  );
}
