import { ROOM_REQUEST, ROOM_SUCCESS } from ".";
import axios from "../helper/axios";

const getData = (props) =>async (dispatch) =>{
    dispatch({type:ROOM_REQUEST});
    const res=await axios.get('/getallroom',{ params:props });
    
    if(res.status===200)
     return dispatch({type:ROOM_SUCCESS,payload:{room:res.data.hotel,count:res.data.count}});
};
export default getData;