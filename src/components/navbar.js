import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

import Icon from "../assets/index-icon.png";
import Login from "./login";
import Register from "./register";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand>
            <img
              src={Icon}
              width="160"
              height="45"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>
            <Form className="d-flex">
              <Button
                variant="outline-success"
                className="mx-1"
                onClick={() => setShowLogin(true)}
              >
                Login
              </Button>
              <Button
                variant="primary"
                className="mx-1"
                onClick={() => setShowRegister(true)}
              >
                Register
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Login
        show={showLogin}
        setShow={setShowLogin}
        setShowRegister={setShowRegister}
      />
      <Register
        show={showRegister}
        setShow={setShowRegister}
        setShowLogin={setShowLogin}
      />
    </div>
  );
}

export default NavBar;
