import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const User = () => {
  const auth = useSelector((state) => state.auth);
  useEffect(() => {}, [auth.loading]);

  /*  return auth?.loading ? (
    "Loading"
  ) : auth.authenticate && auth.user.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  ); */
  return auth.authenticate && auth.user.role === "user" ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};
export default User;
