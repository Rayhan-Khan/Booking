import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCECSS } from "./index";
import axios from "../helper/axios";

const LoginAction = (form) => async (dispatch) => {
  try {
    let res;
    
    //cookie checking
    if (form === undefined) res = await axios.post("/userExist", {AUTH_REQUEST});
    //login request
    else{ 
      dispatch({ type: AUTH_REQUEST });
      res = await axios.post("/login", form);}
    if (res.status === 200)
      return dispatch({
        type: AUTH_SUCCECSS,
        payload: { user: res.data.data, message: res.data.message },
      });
  } catch (error) {
    const { data, status } = error.response;
    if (status === 401) {
      return dispatch({
        type: AUTH_FAILURE,
        payload: { error: data, message: data },
      });
    }
    if (status === 403) {
        return dispatch({
          type: AUTH_FAILURE,
          payload: { error: null, message: data },
        });
      }
  }
};
export default LoginAction;
