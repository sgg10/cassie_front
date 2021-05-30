import { post } from "axios";
import getFormData from "../util/objToFormData";

const HOST = process.env.VUE_APP_API_HOST;
const BASE_URL = `${HOST}/users`;

function login(email, password) {
  const URL = `${BASE_URL}/login/`;
  const body = new FormData();
  body.append("email", email);
  body.append("password", password);

  const config = {
    headers: { "Content-Type": "application/json" }
  };

  console.log(URL);
  return post(URL, body, config);
}

function signup(data) {
  const URL = `${BASE_URL}/signup/`;
  const body = getFormData(data);
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  return post(URL, body, config);
}

function verify(token) {
  const URL = `${BASE_URL}/verify/`;
  const body = new FormData();
  body.append("token", token);
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  return post(URL, body, config);
}

function refreshToken(token) {
  const URL = `${BASE_URL}/refresh/`;
  const body = new FormData();
  body.append("refresh", token);
  const config = {
    headers: { "Content-Type": "application/json" }
  };
  return post(URL, body, config);
}

export { login, signup, verify, refreshToken };
