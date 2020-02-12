import axios from "axios";

function register(credentials) {
  return axios.post("http://127.0.0.1:8000/Register", credentials);
}

function update(id, credentials) {
  // console.log(id, credentials);
  return axios.put("http://127.0.0.1:8000/users/" + id, credentials);
}

export default {
  register,
  update
};
