import axios from "axios";
import jwtDecode from "jwt-decode";
import localStorageAPI from "./localStorageAPI";
import config from "./config";

//When an user logins, if the credentials are rights, we send back data to identify him.
//DATA structure in browser memory : customer, hasShop
//Data strcture in local storage : API like : client, client.hasShop, isShop
//Then we store data into local storage.
function authenticate(credentials) {
  return axios
    .post(config.URL_API + "/login", credentials)
    .then(response => {
      return response.data;
    })
    .then(data => {
      // console.log(data);
      //Stocking in local storage
      window.localStorage.setItem("authToken", data.token);
      if (data.shop) {
        data.shop.PercentPerLangs = localStorageAPI.transformPercentPerLangArrayIntoObject(
          data.shop.PercentPerLangs
        );
      }
      window.localStorage.setItem("userInfos", JSON.stringify(data));

      //Puting token into axios bearer
      axios.defaults.headers["Authorization"] = "Bearer " + data.token;

      //We return an object containing all data relevant to the current user : is he logged, who is he. Of course, every access is checked on the server.
      return {
        isAuthenticated: true,
        user: {
          id: data.user.id,
          email: data.user.email,
          roles: data.user.roles
        },
        customer: {
          id: data.client.id,
          prenom: data.client.prenom,
          nom: data.client.nom,
          tel: data.client.tel,
          adress: data.client.adress,
          postalCode: data.client.postalCode,
          town: data.client.town,
          SellRequests: data.client.SellRequests
        },
        shop: {
          id: data.client.shop.id,
          legalName: data.client.shop.legalName,
          SIRET: data.client.shop.SIRET,
          vatNumber: data.client.shop.vatNumber,
          tel: data.client.shop.tel,
          email: data.client.shop.email,
          adress: data.client.shop.adress,
          postalCode: data.client.shop.postalCode,
          town: data.client.shop.town,
          legalClausesBuying: data.shop
            ? data.shop.legalClausesBuying === null
              ? ""
              : data.shop.legalClausesBuying
            : "",
          shopData: data.shop
            ? {
                baseLang: data.shop.baseLang,
                PercentPerLangs: data.shop.PercentPerLangs,
                PercentPerConditions: data.shop.PercentPerConditions,
                PercentPerConditionFoils: data.shop.PercentPerConditionFoils,
                PercentPerSigned: data.shop.percentPerSigned
              }
            : null
        }
      };
    });
}

function logout() {
  window.localStorage.removeItem("authToken");
  window.localStorage.removeItem("userInfos");
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

      return true;
    }
  } else {
    return false;
  }
}

//Get user info from Local Storage
function userInfos() {
  //1. Voir si on a un token
  const token = window.localStorage.getItem("authToken");

  //Vérifier si la date d'exp du token est bonne, si oui on considère que connecté ( le serveur fait le vrai check derrière)
  if (token) {
    const jwtData = jwtDecode(token);

    //We get back all datas stocked in the browser about the user and put it back in memory.
    const userDatas = JSON.parse(window.localStorage.getItem("userInfos"));
    //console.log(userDatas);

    return {
      isAuthenticated: jwtData.exp * 1000 > new Date().getTime(),
      user: {
        id: userDatas.user.id,
        email: userDatas.user.email,
        roles: userDatas.user.roles
      },
      customer: {
        id: userDatas.client.id,
        prenom: userDatas.client.prenom,
        nom: userDatas.client.nom,
        tel: userDatas.client.tel,
        adress: userDatas.client.adress,
        postalCode: userDatas.client.postalCode,
        town: userDatas.client.town,
        SellRequests: userDatas.client.SellRequests
      },
      shop: {
        id: userDatas.client.shop.id,
        legalName: userDatas.client.shop.legalName,
        SIRET: userDatas.client.shop.SIRET,
        vatNumber: userDatas.client.shop.vatNumber,
        tel: userDatas.client.shop.tel,
        email: userDatas.client.shop.email,
        adress: userDatas.client.shop.adress,
        postalCode: userDatas.client.shop.postalCode,
        town: userDatas.client.shop.town,
        legalClausesBuying: userDatas.shop
          ? userDatas.shop.legalClausesBuying === null
            ? ""
            : userDatas.shop.legalClausesBuying
          : "",
        shopData: userDatas.shop
          ? {
              baseLang: userDatas.shop.baseLang,
              PercentPerLangs: userDatas.shop.PercentPerLangs,
              PercentPerConditions: userDatas.shop.PercentPerConditions,
              PercentPerConditionFoils: userDatas.shop.PercentPerConditionFoils,
              PercentPerSigned: userDatas.shop.percentPerSigned
            }
          : null
      }
    };
  } else {
    return {
      isAuthenticated: false,
      user: {
        id: "",
        email: "",
        roles: []
      },
      customer: {
        id: "",
        prenom: "",
        nom: "",
        tel: "",
        adress: "",
        postalCode: "",
        town: "",
        SellRequests: []
      },
      shop: {
        id: "",
        legalName: "",
        SIRET: "",
        vatNumber: "",
        tel: "",
        email: "",
        adress: "",
        postalCode: "",
        town: "",
        shopData: null
      }
    };
  }
}

//Update User Info in the local storage
function updateUserInfosLocalStorage(allUserInfos) {
  window.localStorage.setItem("userInfos", JSON.stringify(allUserInfos));
}

export default {
  authenticate: authenticate,
  logout: logout,
  setup: setup,
  userInfos,
  updateUserInfosLocalStorage
};
