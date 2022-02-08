import { LOGOUT_REQUEST, LOGOUT_SUCCESS } from ".";
import axios from "../helper/axios";

const logout = (props) => async (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST });
  const res = await axios.post("/logout");
  if (res.status === 200)
    dispatch({ type: LOGOUT_SUCCESS, payload: { message: res.data.message } });
};

export default logout;
