import { AUTH_FAILURE, AUTH_REQUEST, AUTH_SUCCECSS } from ".";
import axios from "../helper/axios";

const SignupAction = (form) => async (dispatch) => {
  dispatch({ type: AUTH_REQUEST });
  try {
    const res = await axios.post("/signup", form, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.status === 201)
      dispatch({
        type: AUTH_SUCCECSS,
        payload: { user: res.data.data, message: res.data.message },
      });
  } catch (err) {
    const {data,status}=err.response;
    if(status===409){
      dispatch({type:AUTH_FAILURE,payload:{message:data.message,error:data.message}});
    }
    if(status===401){
      dispatch({type:AUTH_FAILURE,payload:{message:null,error:data.error}})
    }
  }
};
export default SignupAction;
