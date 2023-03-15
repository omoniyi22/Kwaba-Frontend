import {
  CREATE_COURSE,
  CLEAR_COURSE_POPUP,
  CREATE_COURSE_LOADING,
  CREATE_COURSE_ERROR,
  GET_ALL_COURSES,
  GET_ALL_COURSES_LOADING,
  DELETE_COURSE_LOADING,
  DELETE_COURSE_SUCCESS,
  DELETE_COURSE_FAIL,
  DELETE_COURSE,
  GET_COURSE,
} from "./../types";
import {
  createCourse,
  getCourseApi,
  deleteCourse,
  editCourse,
  publishCourse,
} from "../apis/service";

export const clearCourseAction = () => async (dispatch) => {
  console.log("close");
  dispatch({
    type: CLEAR_COURSE_POPUP,
  });
};

export const pickCourseAction = (courseData, history) => async (dispatch) => {
  dispatch({
    type: GET_COURSE,
    payload: courseData,
  });
  history.push("/app/course");
};

export const createCourseAction = (courseData) => async (dispatch) => {
  dispatch({
    type: CREATE_COURSE_LOADING,
    payload: true,
  });
  try {
    let create = await createCourse(courseData);
    console.log({ register: create.data.data });
    dispatch({
      type: CREATE_COURSE,
      payload: create.data.data,
    });
  } catch (error) {
    console.log({ err: error.response });
    console.log({ error });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_COURSE_ERROR,
      payload: error,
    });
    console.log({ error });
  }
};

export const publishCourseAction = (
  courseId,
  courseIndex,
  callback,
  setPublish
) => async (dispatch, store) => {
  dispatch({
    type: CREATE_COURSE_LOADING,
    payload: true,
  });
  try {
    let create = await publishCourse(courseId);
    let register = await create.data.data;

    const coursa = store().course.courses;
    let courses = coursa;

    let courseIndex = courses.findIndex((data, i) => {
      if (data._id === courseId) {
        return i;
      }
    });

    courses[courseIndex] = register;

    console.log({ courses, register });

    dispatch({
      type: DELETE_COURSE,
      payload: courses,
    });
    setPublish(false);
    setPublish(true);
    callback();
  } catch (error) {
    console.log({ error });
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_COURSE_ERROR,
      payload: error,
    });
  }
};

export const editCourseAction = (courseId, courseData) => async (dispatch) => {
  console.log({ courseId, courseData });
  dispatch({
    type: CREATE_COURSE_LOADING,
    payload: true,
  });
  try {
    console.log({ courseData, courseId });
    let create = await editCourse(courseId, courseData);

    console.log({ register: create.data });
    dispatch({
      type: CREATE_COURSE,
      payload: create.data.data,
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_COURSE_ERROR,
      payload: error,
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

export const deleteCoursesAction = (id) => async (dispatch) => {
  dispatch({
    type: GET_ALL_COURSES_LOADING,
    payload: true,
  });
  try {
    let courses = await deleteCourse(id);
    courses = await getCourseApi();
    console.log({ courses: courses.data.data });
    dispatch({
      type: DELETE_COURSE,
      payload: courses.data.data,
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
      type: CREATE_COURSE_ERROR,
      payload: [],
    });
  }
};
