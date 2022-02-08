import { ROOM_REQUEST, ROOM_SUCCESS } from "../action";
const initialState = {
  Room: [{
    _id:"",
    Name: "",
    type: "",
    Location: "",
    Room: "",
    Price: "",
    Breakfast: false,
    Offer: 0,
    calculatePrice:0,
    Restaurant: false,
    Details: "",
    coverPhoto: "",
    RoomPhoto: [],
  }],
  count:0,
  loading: false,
};

const RoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROOM_REQUEST:
      state = { ...state, loading: true };
      break;
    case ROOM_SUCCESS:
      state = {
        ...state,
        Room:[...action.payload.room],
        loading: false,
        count:action.payload.count
      };
      break;
    default:
      break;
  }
  return state
};

export default RoomReducer;
