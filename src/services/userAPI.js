import axios from "axios";

function register(credentials) {
  return axios
    .post("http://127.0.0.1:8000/Register", credentials)
    .then(response => console.log(response));
}

function update(id, credentials) {
  return axios
    .put("http://127.0.0.1:8000/users/" + id, credentials)
    .then(response => console.log(response));
}

export default {
  register,
  update
};
