import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { API } from "../config/api";
import { Alert } from "react-bootstrap";

const Login = ({ show, setShow, setShowRegister }) => {
  // const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [state, dispatch] = useContext(UserContext);
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  console.log(form);

  const navigate = useNavigate();

  const handleOnSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      // const header = {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.token}`,
      //   },
      // };
      const data = await API.post("/login", form);
      const alert = <Alert variant="sucsess">Login Success</Alert>;
      setMessage(alert);
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: data.data.data,
      });

      let payload = data.data.data;

      handleClose();
      navigate("/home");
      console.log("ini payload", payload);
      console.log("ini data", data);
    } catch (e) {
      console.log(e);
      const alert = <Alert variant="danger">Login Filed</Alert>;
      setMessage(alert);
    }
  });

  return (
    <div>
      <Modal className="modal-sm" show={show} onHide={handleClose}>
        <Modal.Body className="p-4">
          <Modal.Title className="items-center mb-3 text-center">
            Login
          </Modal.Title>
          {message && message}
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                autoFocus
                name="email"
                value={form?.email}
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
                value={form?.password}
                onChange={handleOnChange}
              />
            </Form.Group>
          </Form>
          <p>
            Don't have an account?{" "}
            <strong
              onClick={() => {
                setShow(false);
                setShowRegister(true);
              }}
            >
              click here
            </strong>
          </p>
          <Button
            onClick={(e) => {
              handleOnSubmit.mutate(e);
            }}
            className="col-12"
            variant="primary"
          >
            Login
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;
