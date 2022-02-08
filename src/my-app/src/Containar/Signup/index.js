import Home from "../Home";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import SignupAction from "../../action/signUpAction";
const Signup = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState("");
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
    if (!Email || !Password || !Name || !confirmPassword)
      return setValidate(true);
    const form = new FormData();
    form.append("Name", Name);
    form.append("Email", Email);
    form.append("passWord", Password);
    form.append("confirmPassword", confirmPassword);
     if(file){
      form.append('profile',file);
    } 
   dispatch(SignupAction(form));
  }
  
  if (auth.autenticate) setShow(false);
  if (show === false) return <Navigate to="/" />;
  return (
    <>
      <Modal size="md" show={show} onHide={handleClose} backdrop="static">
        <Modal.Body>
          <button onClick={handleClose} className="close">
            X
          </button>
          <h3 className="center">SignUp</h3>
          <Form noValidate validated={isValidate}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                value={Name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Name"
              />
              <Form.Control.Feedback type="invalid">
                Name is required
              </Form.Control.Feedback>
            </Form.Group>
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
              <h3 style={{ color: "red" }}>
                {auth.error && auth.message?auth.message : null}
              </h3>
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
              
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                placeholder="Confirm Password"
              />
              <Form.Control.Feedback type="invalid">
                confirm password required
              </Form.Control.Feedback>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Profile Picture</Form.Label>
                <Form.Control
                  name="profile"
                  onChange={(e) =>setFile( e.target.files[0])}
                  type="file"
                />
              </Form.Group>
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
                SignUp
              </Button>
            </div>
            <div>
              <Link to="/login">
                <Button style={{ width: "100%", marginTop: "10px" }}>
                  Login
                </Button>
              </Link>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Signup;
