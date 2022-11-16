import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

function ToastBookmark({ show, setShow }) {
  return (
    <Row className="position-fixed toast-container bottom-0 center-0 p-3">
      <Col xs={6}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>Bookmark Success</Toast.Body>
        </Toast>
      </Col>
    </Row>
  );
}

export default ToastBookmark;
