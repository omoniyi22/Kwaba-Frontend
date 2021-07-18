import {
  CREATE_INSTRUCTOR,
  EDIT_INSTRUCTOR,
  CREATE_INSTRUCTOR_SUCCESS,
  INSTRUCTOR_LOADER,
  CREATE_INSTRUCTOR_FAILED,
  CREATE_INSTRUCTOR_LOADING,
  GET_ALL_INSTRUCTORS,
  GET_ALL_INSTRUCTORS_LOADING,
  CLEAR_INSTRUCTOR_POPUP,
  ASSIGNED_INSTRUCTOR,
  PICK_INSTRUCTOR
} from "./../types";

import {
  createInstructor,
  getCourseApi,
  removeInstructorFromACourse,
  getInstructors,
  assignInstructorToCourse,
  getOneCourseApi,
  editInstructor
} from "../apis/service";

export const clearInstructorAction = () => async dispatch => {
  dispatch({
    type: CLEAR_INSTRUCTOR_POPUP
  });
};
export const pickInstructorAction = intructor => async dispatch => {
  dispatch({
    type: PICK_INSTRUCTOR,
    payload: intructor
  });
};

export const getInstructorAssignToCourseAction = () => async (
  dispatch,
  state
) => {
  let courseId = state().course.course._id;

  dispatch({
    type: CREATE_INSTRUCTOR_LOADING,
    payload: true
  });
  try {
    let instructors = await getOneCourseApi(courseId);
    instructors = instructors.data.data.instructors;
    console.log({ ins: instructors });
    dispatch({
      type: ASSIGNED_INSTRUCTOR,
      payload: instructors
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_INSTRUCTOR_FAILED,
      payload: error
    });
  }
};
export const assignInstructorToCourseAction = instructorId => async (
  dispatch,
  state
) => {
  let courseId = state().course.course._id;

  dispatch({
    type: INSTRUCTOR_LOADER,
    payload: true
  });
  try {
    let create = await assignInstructorToCourse(courseId, instructorId);
    console.log({ register: create.data.data });

    let outlines = await getOneCourseApi(courseId);

    outlines = outlines.data.data.instructors;

    console.log({ outlines });

    dispatch({
      type: ASSIGNED_INSTRUCTOR,
      payload: outlines
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.message;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_INSTRUCTOR_FAILED,
      payload: error
    });
  }
};

export const removeInstructorFromCourseAction = (
  instructorId,
  callback
) => async (dispatch, state) => {
  let courseId = state().course.course._id;

  dispatch({
    type: INSTRUCTOR_LOADER,
    payload: true
  });
  try {
    console.log({
      courseId,
      instructorId
    });
    let create = await removeInstructorFromACourse(courseId, instructorId);
    console.log({ register: create.data });

    let outlines = await getOneCourseApi(courseId);

    outlines = outlines.data.data.instructors;

    console.log({ outlines });
    dispatch({
      type: ASSIGNED_INSTRUCTOR,
      payload: outlines
    });
    callback();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.message;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_INSTRUCTOR_FAILED,
      payload: error
    });
  }
};

export const createInstructorAction = instructorData => async dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADER,
    payload: true
  });
  try {
    let create = await createInstructor(instructorData);
    console.log({ register: create.data.data });
    dispatch({
      type: CREATE_INSTRUCTOR,
      payload: create.data.data
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_INSTRUCTOR_FAILED,
      payload: error
    });
  }
};

export const editInstructorAction = (id, instructorData) => async (
  dispatch,
  state
) => {
  dispatch({
    type: INSTRUCTOR_LOADER,
    payload: true
  });

  try {
    let create = await editInstructor(id, instructorData);
    console.log({ register: create.data });
    dispatch({
      type: CREATE_INSTRUCTOR,
      payload: create.data.data
    });
  } catch (error) {
    console.log({ err: error.response });
    console.log({ err: error.message });
    if (error.response) {
      error = "Instructor's profile is uncompleted";
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_INSTRUCTOR_FAILED,
      payload: error
    });
  }
};

export const getAllInstructorsAction = () => async dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADER,
    payload: true
  });
  try {
    let instructors = await getInstructors();
    console.log({ instructor: instructors.data.data });
    dispatch({
      type: GET_ALL_INSTRUCTORS,
      payload: instructors.data.data
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
      type: GET_ALL_INSTRUCTORS,
      payload: []
    });
  }
};
