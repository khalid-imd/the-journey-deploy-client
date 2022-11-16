import React, { useState } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { useMutation } from "react-query";
import { API } from "../config/api";

const Register = ({ show, setShow, setShowLogin }) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const { fullname, email, password, phone, address } = form;

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  console.log(form);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const response = await API.post("/register", form);
      const alert = (
        <Alert variant="success">Berhasil mendaftarkan akun!</Alert>
      );
      setMessage(alert);
      setShow(false);
      setShowLogin(true);
      console.log("", response);
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed to register account
        </Alert>
      );
      setMessage(alert);
      console.log(error);
    }
  });

  return (
    <div>
      <Modal className="modal-sm" show={show} onHide={handleClose}>
        <Modal.Body className="p-4">
          <Modal.Title className="items-center mb-3 text-center">
            Register
          </Modal.Title>

          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                autoFocus
                name="fullname"
                value={fullname}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                autoFocus
                name="email"
                value={email}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                autoFocus
                name="password"
                value={password}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your phone"
                autoFocus
                name="phone"
                value={phone}
                onChange={handleOnChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                autoFocus
                name="address"
                value={address}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
          <p>
            Already have an account?{" "}
            <strong
              onClick={() => {
                setShow(false);
                setShowLogin(true);
              }}
            >
              click here
            </strong>
          </p>
          <Button
            type="submit"
            className="col-12"
            variant="primary"
            onClick={(e) => handleSubmit.mutate(e)}
            // onClick={(e) => {
            //   setShow(false);
            //   setShowLogin(true);
            // }}
          >
            Register
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Register;
