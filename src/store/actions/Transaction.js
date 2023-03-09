import { MAKE_PAYMENT, GET_ALL_TRANSACTIONS } from "./../types"


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
export const getAllCoursesApi = (courseData) => async (dispatch, state) => {
  dispatch({
    type: GET_ALL_COURSES_LOADING,
    payload: true,
  });
  try {
    let courses = await getCourseApi();
    console.log({ courses: courses.data.data });

    let auth_type = state().auth.auth_type;
    let auth_id = state().auth.profile._id;
    courses = await courses.data.data;

    if (auth_type === "Instructor") {
      let new_courses = [];
      let chc = courses.filter((data) => data.instructors.length > 0);
      console.log({ ins: chc });
      for (let chck of chc) {
        console.log({ ins: chck.instructors });
        for (let chck2 of chck.instructors) {
          console.log({ id: chck2._id, auth_id });
          if (chck2.instructor === auth_id) {
            new_courses.push(chck);
          }
        }
      }
      courses = new_courses;
      console.log({ new_courses });
    }

    dispatch({
      type: GET_ALL_COURSES,
      payload: courses,
    });
  } catch (error) {
    console.log({ err: error.response });
    console.log({ err: error.message });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: GET_ALL_COURSES,
      payload: [],
    });
  }
};
