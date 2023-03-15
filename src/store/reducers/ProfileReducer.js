import { AUTH_TOKEN } from "../apis/base";
import {
  AUTH_ERROR,
  AUTHENTICATED,
  AUTH_LOADING,
  LOGOUT,
  USER_LOADED,
  CLEAR_AUTH_ERROR,
  PROFILE_CHANGED,
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
    case PROFILE_CHANGED:
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
      localStorage.setItem(AUTH_TOKEN, action.payload.token);
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
