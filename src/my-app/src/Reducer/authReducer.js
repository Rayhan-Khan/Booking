import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCECSS,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
} from "../action";

const initialState = {
  user: {
    _id: "",
    Name: undefined,
    Email: undefined,
    Profile: "",
  },
  message: "",
  authenticate: false,
  authenticating: false,
  loading: true,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_REQUEST:
      state = {
        ...state,
        loading: true,
        authenticating: true,
      };
      break;
    case AUTH_SUCCECSS:
      state = {
        ...state,
        user: action.payload.user,
        message: action.payload.message,
        authenticating: false,
        authenticate: true,
        loading: false,
        error: null,
      };
      break;
    case AUTH_FAILURE:
      state = {
        ...state,
        message: action.payload.message,
        authenticating: false,
        loading: false,
        error: action.payload.error,
      };
      break;
    case LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case LOGOUT_SUCCESS:
      state = {
        ...state,
        message: action.payload.message,
        authenticate: false,
        authenticating: false,
        loading: false,
        error: null,
        user: initialState.user,
      };
      break;
    default:
      break;
  }
  return state;
};
export default authReducer;
