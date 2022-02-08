//import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import "./index.css";
import login from "../../img/login.jpg";
import LoginAction from "../../action/loginAction";
import Home from "../Home";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [show, setShow] = useState(true);
  const [isValidate, setValidate] = useState(false);
  const handleClose = () => {
    auth.error = null;
    setShow(false);
  };
  useEffect(() => {
    auth.error = null;
    setShow(true);
  }, []);
  function handleSubmit() {
    if (!Email || !Password) return setValidate(true);
    dispatch(LoginAction({ Email, passWord: Password }));
    if (auth.authenticate) setShow(false);
  }
  if (show === false) return <Navigate to="/" />;
  return (
    <>
      <Modal size="md" show={show} onHide={handleClose} backdrop="static">
        <Modal.Body>
          <button onClick={handleClose} className="close">
            X
          </button>
          <h3 className="center">Login</h3>
          <div className="img-containar">
            <img className="login center" src={login} alt="login" />
          </div>
          <Form noValidate validated={isValidate}>
            <Form.Group className="mb-3" controlId="formBasicEmail"> 
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter email"
              />
              <Form.Control.Feedback type="invalid">
                Email is required
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                value={Password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <Form.Control.Feedback type="invalid">
                Valid password required
              </Form.Control.Feedback>
              <h3 style={{ color: "red" }}>
                {auth.error ? auth.message : null}
              </h3>
            </Form.Group>
            <div
              style={{
                border: 0,
                display: "flex",
                justifyContent: "center",
                columnGap: "10px",
              }}
            >
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button onClick={handleSubmit} variant="primary">
                Login
              </Button>
              <Link to="forgetpassword">Forget Password??</Link>
            </div>
            <div>
              <Link to="/signup">
                <Button style={{ width: "100%", marginTop: "10px" }}>
                  Signup
                </Button>
              </Link>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginForm;
