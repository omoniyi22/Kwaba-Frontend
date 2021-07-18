import axios from "axios";


const BASE = `https://kwaba-interview.herokuapp.com`;


export const AUTH_TOKEN = "benny-token";
const api = axios.create({
  baseURL: `${BASE}/v1/api`,
  headers: {
    "Content-Type": "application/json",
    Accept: "multipart/form-data",
  },
});

export const API = async () => {
  try {
    const apiToken = localStorage.getItem(AUTH_TOKEN);
    console.log({ AUTH_TOKEN, apiToken });
    if (apiToken) {
      api.defaults.headers[AUTH_TOKEN] = `${apiToken}`;
    }
    return api;
  } catch (error) {
    return api;
  }
};

export default BASE;
