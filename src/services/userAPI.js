import axios from "axios";
import config from "./config";

function register(credentials) {
  return axios.post(config.URL_API + "/Register", credentials);
}

function update(id, credentials) {
  // console.log(id, credentials);
  return axios.put(config.URL_API + "/users/" + id, credentials);
}

export default {
  register,
  update
};
