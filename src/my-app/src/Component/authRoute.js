import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const Auth = (props) => {
  const auth = useSelector((state) => state.auth);
  /*  return auth.loading ? (
    "loading"
  ) : !auth.authenticate ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  ); */

  return !auth.authenticate ? <Outlet /> : <Navigate to="/" />;
};
export default Auth;
