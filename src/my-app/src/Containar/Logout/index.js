import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import logout from "../../action/logout";

const Logout = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(()=>{dispatch(logout());},[]);
  
  return auth.loading ? 'Loading' : <Navigate to="/" />;
};
export default Logout;
