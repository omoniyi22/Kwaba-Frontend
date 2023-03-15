import {
  RegisterApi,
  LoginApi,
  editProfile,
} from "../apis/service";
import {
  AUTHENTICATED,
  AUTH_LOADING,
  LOGOUT,
  AUTH_ERROR,
  CLEAR_AUTH_ERROR,
  PROFILE_CHANGED,
} from "../types";

export const clearAuthErrorAction = () => async (dispatch) => {
  dispatch({ type: CLEAR_AUTH_ERROR });
};

export const RegisterAction = (regDetails) => async (dispatch) => {
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
    let err
    console.log({ err: error.response });
    if (error.response) {
      err = error.response.data.msg;
      console.log({ error });
    } else {
      err = "Something went wrong. Try Again";
    }
    dispatch({
      type: AUTH_ERROR,
      payload: err,
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
    console.log({ login: login.data });
    dispatch({
      type: AUTHENTICATED,
      payload: login.data,
      user: login.data.user,
    });

   
  } catch (error) {
    let err
    console.log({ err: error.response });
    if (error.response) {
      err = error.response.data.msg;
      console.log({ error });
    } else {
      err = "Something went wrong. Try Again";
    }
    dispatch({
      type: AUTH_ERROR,
      payload: err,
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

      user = await user.data.data;
      // user = { ...Profile, user };

      console.log({ user });
      await dispatch({
        type: PROFILE_CHANGED,
        payload: user,
      });
      callback();
    } catch (error) {
      let err
      console.log({ err: error.response });
      console.log({ err: error });
      if (error.response) {
        err = error.response.data.msg;
        console.log({ error });
      } else {
        err = "Something went wrong. Try Again";
      }
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

export const LogoutAction = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
};
