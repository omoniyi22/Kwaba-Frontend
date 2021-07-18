import {
  CREATE_OUTLINE,
  OUTLINE_LOADING,
  CREATE_OUTLINE_ERROR,
  GET_ALL_OUTLINES,
  CLEAR_OUTLINE_POPUP,
  GET_CONTENTS
} from "./../types";

import {
  createInstructor,
  getCourseApi,
  getInstructors,
  deleteContentApi,
  editContentApi,
  createOutlineApi,
  getOneCourseApi,
  editOutlineApi,
  deleteOutlineApi,
  createContent,
  getOneOutlineApi,
  watchContentApi
} from "../apis/service";

// export const getACourseAction = () => async dispatch => {

// }
import asynK from "async";
export const clearOutlineAction = () => async dispatch => {
  // console.log("close");
  dispatch({
    type: CLEAR_OUTLINE_POPUP
  });
};

export const createOutlineAction = (courseData, callback) => async (
  dispatch,
  state
) => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    let courseId = state().course.course._id;
    let create = await createOutlineApi(courseId, courseData);
    console.log({ outline: create.data.data });

    let outlines = await getOneCourseApi(courseId);
    outlines = outlines.data.data.courseOutline;
    console.log({ outlines });
    dispatch({
      type: CREATE_OUTLINE,
      payload: outlines
    });
    callback();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

export const deleteOutlineAction = (outlineId, callback) => async (
  dispatch,
  state
) => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    console.log({ outlineId });
    let id = state().course.course._id;
    let create = await deleteOutlineApi(outlineId);
    console.log({ outline: create.data });

    let outlines = await getOneCourseApi(id);
    outlines = outlines.data.data.courseOutline;
    console.log({ outlines });
    dispatch({
      type: CREATE_OUTLINE,
      payload: outlines
    });
    callback();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

export const editOutlineAction = (courseId, courseData) => async (
  dispatch,
  state
) => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    console.log({ courseId, courseData });
    let id = state().course.course._id;
    let create = await editOutlineApi(courseId, courseData);
    console.log({ outline: create.data });

    let outlines = await getOneCourseApi(id);
    outlines = outlines.data.data.courseOutline;
    console.log({ outlines });
    dispatch({
      type: CREATE_OUTLINE,
      payload: outlines
    });
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

export const getAllOutlinesAction = () => async (dispatch, state) => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });

  let id = state().course.course._id;
  try {
    let outlines = await getOneCourseApi(id);
    outlines = outlines.data.data.courseOutline;

    let multiBots = outlines.map(
      input =>
        function(callback) {
          setTimeout(async () => {
            console.log({ input: input._id });
            let Alloutlines = await getOneOutlineApi(input._id);
            Alloutlines = Alloutlines.data.data.content;
            callback(null, Alloutlines);
          });
        }
    );

    asynK.parallel(multiBots, function(err, result) {
      if (err) {
        console.log({ message: "Internal Error" });
      } else {
        dispatch({
          type: GET_CONTENTS,
          payload: result
        });
      }
      console.log({ result });
    });
    console.log({ outlines });
    dispatch({
      type: GET_ALL_OUTLINES,
      payload: outlines
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
      type: CREATE_OUTLINE_ERROR,
      payload: []
    });
  }
};

export const watchContentAction = (contentId, callBack) => async dispatch => {
  console.log("Ready to watch");
  console.log({ contentId });
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    console.log({ contentId });
    console.log({ contentId });
    let outlines = await watchContentApi(contentId);
    console.log({ contentId });

    outlines = outlines.data.data;
    console.log({ outlines });

    callBack();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

export const createContentAction = (
  outlineId,
  courseContent,
  callBack
) => async (dispatch, state) => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    console.log({ outlineId, courseContent });
    let id = state().course.course._id;
    let create = await createContent(outlineId, courseContent);
    console.log({ outline: create.data });

    let outlines = await getOneCourseApi(id);
    outlines = outlines.data.data.courseOutline;
    console.log({ outlines });
    dispatch({
      type: CREATE_OUTLINE,
      payload: outlines
    });
    callBack();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

export const deleteContentAction = (contentId, callback) => async dispatch => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    await deleteContentApi(contentId);

    callback();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

export const editContentAction = (
  contentId,
  data,
  callback
) => async dispatch => {
  dispatch({
    type: OUTLINE_LOADING,
    payload: true
  });
  try {
    await editContentApi(contentId, data);

    callback();
  } catch (error) {
    console.log({ err: error.response });
    if (error.response) {
      error = error.response.data.error;
    } else {
      error = "Something went wrong. Try Again";
    }
    dispatch({
      type: CREATE_OUTLINE_ERROR,
      payload: error
    });
  }
};

// export const getContentAction = outlineId => async (dispatch, state) => {
//   dispatch({
//     type: OUTLINE_LOADING,
//     payload: true
//   });
//   try {
//     console.log({ outlineId });
//     let id = state().course.course._id;

//     let create = await createContent(outlineId);

//     console.log({ outline: create.data });

//     let outlines = await getOneCourseApi(id);

//     outlines = outlines.data.data.courseOutline;
//     console.log({ outlines });
//     dispatch({
//       type: CREATE_OUTLINE,
//       payload: outlines
//     });
//   } catch (error) {
//     console.log({ err: error.response });
//     if (error.response) {
//       error = error.response.data.error;
//     } else {
//       error = "Something went wrong. Try Again";
//     }
//     dispatch({
//       type: CREATE_OUTLINE_ERROR,
//       payload: error
//     });
//   }
// };
