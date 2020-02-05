import axios from "axios";
import jwtDecode from "jwt-decode";

function authenticate(credentials) {
  return axios
    .post("http://127.0.0.1:8000/login", credentials)
    .then(response => response.data.token)
    .then(token => {
      //On stocke le token dans le local storage
      window.localStorage.setItem("authToken", token);

      //Faire en sorte maintenant que Axios porte le token dans son autorisation header de requete
      //On affete ses parametres par defaut
      axios.defaults.headers["Authorization"] = "Bearer " + token;

      return true;
    });
}

function register(credentials) {
  console.log(credentials);
  return axios
    .post("http://127.0.0.1:8000/Register", credentials)
    .then(response => console.log(response));
}

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function setup() {
  //1. Voir si on a un token
  const token = window.localStorage.getItem("authToken");

  //2. Verifier si le token est valide
  if (token) {
    const jwtData = jwtDecode(token);

    if (jwtData.exp * 1000 > new Date().getTime()) {
      //3. Donner le token à axios
      axios.defaults.headers["Authorization"] = "Bearer " + token;
    }
  }
}

function isAuthenticated() {
  //1. Voir si on a un token
  const token = window.localStorage.getItem("authToken");
  //Vérifier si la date d'exp du token est bonne, si oui on considère que connecté ( le serveur fait le vrai check derrière)
  if (token) {
    const jwtData = jwtDecode(token);

    return jwtData.exp * 1000 > new Date().getTime();
  } else {
    return false;
  }
}

function isAdmin() {}

export default {
  authenticate: authenticate,
  logout: logout,
  setup: setup,
  isAuthenticated: isAuthenticated,
  register,
  isAdmin
};
