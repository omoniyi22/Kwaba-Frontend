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

//  Transactions
export const getAllTransactions = async (email) => {
  let AUTH_API = await API();
  return AUTH_API.get(`/transactions/${email}`);
};

