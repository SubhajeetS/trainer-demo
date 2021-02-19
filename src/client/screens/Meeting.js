import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getSession } from "../redux/actions";

const CONTAINER_STYLE = {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

export default function Meeting() {
  const history = useHistory();
  const dispatch = useDispatch();
  
  const onClick = (event) => {
    dispatch(getSession())
      .then(() => {
        history.push("/trainer");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Container fluid style={CONTAINER_STYLE}>
      <Row>
        <Col>
          <Button variant="dark" onClick={onClick}> Join Meeting</Button>
        </Col>
      </Row>
    </Container>
  );
}
