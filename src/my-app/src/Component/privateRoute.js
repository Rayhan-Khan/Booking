import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoute = () => {  
    const auth = useSelector((state) => state.auth);
    console.log(auth)
    return auth.authenticate?<Outlet/>:<Navigate to='/login'/>
};
export default PrivateRoute;