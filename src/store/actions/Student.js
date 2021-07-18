import {
  INSTRUCTOR_LOADER,
  GET_ALL_STUDENTS,
  CLEAR_INSTRUCTOR_POPUP
} from "./../types";

import { getStudents } from "../apis/service";

export const clearInstructorAction = () => async dispatch => {
  dispatch({
    type: CLEAR_INSTRUCTOR_POPUP
  });
};

export const getAllStudentsAction  = () => async dispatch => {
  dispatch({
    type: INSTRUCTOR_LOADER,
    payload: true
  });
  try {
    let students = await getStudents();
    console.log({ instructor: students.data.data });
    dispatch({
      type: GET_ALL_STUDENTS,
      payload: students.data.data
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
      type: GET_ALL_STUDENTS,
      payload: []
    });
  }
};
