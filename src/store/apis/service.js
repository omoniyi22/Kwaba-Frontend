import { API } from "./base";

//Auth Api
export const RegisterApi = async (userDetails) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/profile/signUp`, userDetails);
};
export const LoginApi = async (loginDetails) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/profile/login`, loginDetails);
};

export const editProfile = async (id, profileDetails) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/profile/updateProfile/${id}`, profileDetails);
};

export const editProfileInstructor = async (profileDetails) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/account/instructor`, profileDetails);
};
export const RefreshApi = async (loginDetails) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/auth/refreshToken`, loginDetails);
};

//  Course
export const createCourse = async (courseDetails) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/course/create`, courseDetails);
};

export const editCourse = async (courseId, courseDetails) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseId}`, courseDetails);
};

export const getCourseApi = async () => {
  let AUTH_API = await API();
  return AUTH_API.get(`/course`);
};

export const createOutlineApi = async (courseId, outlineData) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/course/${courseId}/outline/create`, outlineData);
};
export const editOutlineApi = async (outlineId, outlineData) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/outline/${outlineId}`, outlineData);
};
export const deleteOutlineApi = async (outlineId) => {
  let AUTH_API = await API();
  return AUTH_API.delete(`/outline/${outlineId}`);
};

export const getAllOutlineApi = async () => {
  let AUTH_API = await API();
  return AUTH_API.get(`/course`);
};

export const getOneOutlineApi = async (outlineId) => {
  let AUTH_API = await API();
  return AUTH_API.get(`/outline/${outlineId}`);
};

export const getCourseCategoryApi = async () => {
  let AUTH_API = await API();
  return AUTH_API.get(`/course/category`);
};

export const getOneCourseApi = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.get(`/course/${courseID}`);
};

export const deleteCourse = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.delete(`/course/${courseID}`);
};

export const updateCourse = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseID}`);
};

export const getAllCoursesByAuthor = async (authorID) => {
  let AUTH_API = await API();
  return AUTH_API.get(`/course/getAllCoursesByAuthor/${authorID}`);
};
export const getAllCoursesByStudent = async (studentID) => {
  let AUTH_API = await API();
  return AUTH_API.get(`/course/getAllCoursesByStudent/${studentID}`);
};

export const publishCourse = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseID}/publish`);
};

export const addStudent = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseID}/addStudent`);
};

export const removeStudent = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseID}/removeStudent`);
};
export const addRates = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseID}/increaseRating`);
};
export const removeRates = async (courseID) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseID}/decreaseRating`);
};

// Instructor
export const getInstructors = async () => {
  let AUTH_API = await API();
  return AUTH_API.get(`/account/getAllInstructor`);
};
// Student
export const getStudents = async () => {
  let AUTH_API = await API();
  return AUTH_API.get(`/account/getAllStudent`);
};
export const assignInstructorToCourse = async (freeCourseId, instructorId) => {
  let AUTH_API = await API();
  return AUTH_API.patch(
    `/course/${freeCourseId}/addInstructor/${instructorId}`
  );
};

export const removeInstructorFromACourse = async (courseId, instructorId) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/course/${courseId}/removeInstructor/${instructorId}`);
};
export const createInstructor = async (instructorDetails) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/account/createInstructor`, instructorDetails);
};
export const editInstructor = async (instructorId, instructorDetails) => {
  let AUTH_API = await API();
  return AUTH_API.patch(
    `/account/Instructor/${instructorId}`,
    instructorDetails
  );
};
export const getAllTransaction = async () => {
  let AUTH_API = await API();
  return AUTH_API.get(`/transaction/getAllTransaction`);
};

// Create Content
export const createContent = async (outlineId, contentData) => {
  let AUTH_API = await API();
  return AUTH_API.post(`/outline/${outlineId}/content/create`, contentData);
};

// Edit Content
export const editContentApi = async (contentId, contentData) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/content/${contentId}`, contentData);
};

// User watched content
export const watchContentApi = async (contentId, contentData) => {
  let AUTH_API = await API();
  return AUTH_API.patch(`/content/${contentId}/hasWatchedContent`, contentData);
};

// Delete Content
export const deleteContentApi = async (contentId) => {
  let AUTH_API = await API();
  return AUTH_API.delete(`/content/${contentId}`);
};

//Role Api
export const AssignRoleApi = () => `/auth/assignRoleToUser`;
export const RevokeRoleApi = () => `/auth/revokeRoleToUser`;

export const AssignAdminApi = (userId) =>
  `/account/${userId}/assignAdminRoleToUser`;
export const RevokeAdminApi = (userId) =>
  `/account/${userId}/revokeAdminRoleFromUser`;
