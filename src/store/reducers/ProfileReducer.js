import {
  AUTH_ERROR,
  AUTHENTICATED,
  AUTH_LOADING,
  LOGOUT,
  USER_LOADED,
  CLEAR_AUTH_ERROR,
} from "../types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  user: {},
  errorMsg: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case CLEAR_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMsg: "",
      };
    case AUTHENTICATED:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.user,
      };

    case AUTH_ERROR:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        errorMsg: action.payload,
      };

    case LOGOUT:
      localStorage.removeItem("token");
      return {
        token: null,
        user: {},
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
