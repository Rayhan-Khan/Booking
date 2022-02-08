import React, { useEffect } from "react";
import "./index.css";
import img from "../../img/hotel-icon.png";
import userpic from "../../img/user.png";

import { Container, Navbar, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoginAction from "../../action/loginAction";
import { generatePublicUrl } from "../../urlconfig";

const Header = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoginAction());
  }, []);
  const auth = useSelector((state) => state.auth);
  const { Name, Profile } = auth.user;

  return auth.loading ? (
    <Container>
      <Spinner animation="grow" size='lg'/>
      <Spinner animation="grow" size='lg'/>
      <Spinner animation="grow" size='lg'/>
    </Container>
  ) : auth.error ? (
    "error"
  ) : (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <Link to="/">
              <button className="header">
                <img className="logo" src={img} alt="logo" /> Booking
              </button>
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <div>
              {auth.authenticate && (
                <div className="header">
                  {Profile ? (
                    <img
                      className="logo userpic"
                      src={generatePublicUrl(Profile)}
                      alt="user"
                    />
                  ) : (
                    <img className="logo userpic" src={userpic} alt="user" />
                  )}
                  {Name}
                </div>
              )}
              {!auth.authenticate && (
                <Link to="/login">
                  <button className="header">Login</button>
                </Link>
              )}
              {auth.authenticate && auth?.user.role === "admin" && (
                <Link to="/admin/createroom">
                  <button className="header">Create Hotel</button>
                </Link>
              )}
              {auth.authenticate &&
                auth?.user.role ===
                  "user" &&(
                    <Link to="/booking">
                      <button className="header">Booking</button>
                    </Link>
                  )}
              {auth.authenticate &&
                auth?.user.role ===
                  "admin" &&(
                    <Link to="/admin/bookinglist">
                      <button className="header">Booking List</button>
                    </Link>
                  )}
              {auth.authenticate && (
                <Link to="/logout">
                  <button className="header">Logout</button>
                </Link>
              )}
              {!auth.authenticate && (
                <Link to="/signup">
                  <button className="header">SignUp</button>
                </Link>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
export default Header;
