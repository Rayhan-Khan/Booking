import { TYPE_SUCCESS } from ".";
import axios from "../helper/axios";
const typelocation = (props) => async (dispatch) => {
  try {
    const res = await axios.get("/alltype");
    if (res.status === 200) {
      dispatch({
        type: TYPE_SUCCESS,
        payload: { type: res.data.type, location: res.data.location },
      });
    }
  } catch (err) {}
};
export default typelocation;
