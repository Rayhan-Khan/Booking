import { TYPE_SUCCESS } from "../action";

const initialdata = {
  loading: false,
  type:[ {
    _id: "",
    count: 0,
    minPrice: 0,
    maxPrice: 0,
    coverPhoto: [],
  }],
  location: [{
    _id: "",
    count: 0,
    minPrice: 0,
    maxPrice: 0,
    coverPhoto: [],
  }],
};
const typelocationReducer = (state = initialdata, action) => {
    
  switch (action.type) {
    case TYPE_SUCCESS:
      state = {
        ...state,
        location:[...action.payload.location],
        type:[...action.payload.type]
      };
      break;
      default: break;
  }
  return state;
};

export default typelocationReducer;
