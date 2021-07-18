import {
  RegisterApi,
  LoginApi,
  editProfile,
  editProfileInstructor,
} from "../apis/service";
import { Dispatch } from "redux";
import {
  AUTHENTICATED,
  AUTH_LOADING,
  LOGOUT,
  AUTH_ERROR,
  PROFILE_ERROR,
  CLEAR_AUTH_ERROR,
  PROFILE_CHANGED,
} from "../types";

export const clearAuthErrorAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_AUTH_ERROR });
};

export const RegisterAction = (regDetails, history) => async (dispatch) => {
  dispatch({
    type: AUTH_LOADING,
    payload: true,
  });
  try {
    let register = await RegisterApi(regDetails);
    console.log({ register: register.data });
    dispatch({
      type: AUTHENTICATED,
      payload: register.data,
      user: register.data.data,
    });
    console.log({
      register: register.data,
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.msg;
      console.log({ error });
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const LoginAction = (loginDetails) => async (dispatch) => {
  console.log({ loginDetails });

  dispatch({
    type: AUTH_LOADING,
    payload: true,
  });
  try {
    let login = await LoginApi(loginDetails);
    console.log({ register: login.data });
    dispatch({
      type: AUTHENTICATED,
      payload: login.data,
      user: login.data.user,
    });

    console.log({
      login: login.data,
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.msg;
      console.log({ error });
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: AUTH_ERROR,
      payload: error,
    });
  }
};

export const ProfileUpdate =
  (profileData, callback) => async (dispatch, state) => {
    console.log({ profileData });
    try {
      await dispatch({ type: AUTH_LOADING });
      let Profile = await state().user;
      console.log({ Profile: Profile });
      let ProfileId = Profile.user._id;
      let user = await editProfile(ProfileId, profileData);

      user = await user.data.user;
      // user = { ...Profile, user };

      console.log({ user });
      await dispatch({
        type: PROFILE_CHANGED,
        payload: user,
      });
      callback();
    } catch (error) {
      console.log({ err: error.response });
      console.log({ err: error });
      if (error.response) {
        error = error.response.data.msg;
        console.log({ error });
      } else {
        error = "Something went wrong. Try Again";
      }
      dispatch({
        type: AUTH_ERROR,
        payload: error,
      });
    }
  };

export const LogoutAction = (history) => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
