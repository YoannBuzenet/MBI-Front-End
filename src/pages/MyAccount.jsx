import React, { useState, useContext } from "react";
import AuthContext from "../context/authContext";
import userAPI from "../services/userAPI";
import AuthAPI from "../services/authAPI";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const MyAccount = () => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  console.log(authenticationInfos);

  const [timer, setTimer] = useState();

  const APIupdate = async () => {
    // console.log("update");

    console.log(authenticationInfos);

    try {
      const response = await userAPI.update(authenticationInfos.user.id, {
        client: {
          id: authenticationInfos.customer.id,
          prenom: authenticationInfos.customer.prenom,
          nom: authenticationInfos.customer.nom,
          tel: authenticationInfos.customer.tel,
          adress: authenticationInfos.customer.adress,
          postalCode: authenticationInfos.customer.postalCode,
          town: authenticationInfos.customer.town,
        },
      });

      //UPDATE LES INFOS EN MEMOIRE VIVE
      setAuthenticationInfos({
        ...authenticationInfos,
        customer: {
          id: response.data.client.id,
          prenom: response.data.client.prenom,
          nom: response.data.client.nom,
          tel: response.data.client.tel,
          adress: response.data.client.adress,
          postalCode: response.data.client.postalCode,
          town: response.data.client.town,
          SellRequests: authenticationInfos.customer.SellRequests,
        },
      });

      //Preparing data format to save, to copy what's stored in local storage
      const currentDataInLocalStorage = AuthAPI.userInfos();
      const newDataInLocalStorage = {
        token: currentDataInLocalStorage.token,
        refresh_token: currentDataInLocalStorage.refresh_token,
        user: {
          id: response.data.id,
          email: response.data.email,
          roles: response.data.roles,
        },
        client: {
          id: response.data.client.id,
          prenom: response.data.client.prenom,
          nom: response.data.client.nom,
          tel: response.data.client.tel,
          adress: response.data.client.adress,
          postalCode: response.data.client.postalCode,
          town: response.data.client.town,
          SellRequests: response.data.client.SellRequests,
          shop: {
            ...authenticationInfos.shop,
          },
        },
        //
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
        },
      };
      AuthAPI.updateUserInfosLocalStorage(newDataInLocalStorage);

      toast.success(
        <FormattedMessage
          id="app.myAccountPage.edition.success"
          defaultMessage={`Your account has been updated.`}
        />
      );
    } catch (error) {
      console.log(error);
      console.log(error.response);
      toast.error(
        <FormattedMessage
          id="app.myAccountPage.edition.failure"
          defaultMessage={`Your account couldn't be updated. Please try again.`}
        />
      );
    }
  };

  const handleChange = (event) => {
    clearTimeout(timer);
    // console.log("change");

    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    console.log("here");

    setAuthenticationInfos({
      ...authenticationInfos,
      customer: { ...authenticationInfos.customer, [name]: value },
    });

    setTimer(setTimeout(APIupdate, 1000));
  };

  return (
    <>
      <div className="container my-account">
        <h1>
          <FormattedMessage
            id="app.myAccountPage.title"
            defaultMessage={`My Account`}
          />
        </h1>
        <form>
          <label htmlFor="prenom">
            <FormattedMessage
              id="app.myAccountPage.FirstName"
              defaultMessage={`First Name`}
            />
          </label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.prenom}
          />

          <label htmlFor="nom">
            <FormattedMessage
              id="app.myAccountPage.LastName"
              defaultMessage={`Last Name`}
            />
          </label>
          <input
            type="text"
            id="nom"
            name="nom"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.nom}
          />

          <label htmlFor="tel">
            <FormattedMessage
              id="app.myAccountPage.Telephone"
              defaultMessage={`Telephone`}
            />
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.tel}
          />

          <label htmlFor="adress">
            <FormattedMessage
              id="app.myAccountPage.adress"
              defaultMessage={`Adress`}
            />
          </label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.adress}
          ></textarea>

          <label htmlFor="postalCode">
            <FormattedMessage
              id="app.myAccountPage.postalCode"
              defaultMessage={`Postal Code`}
            />
          </label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.postalCode}
          />

          <label htmlFor="town">
            <FormattedMessage
              id="app.myAccountPage.town"
              defaultMessage={`Town`}
            />
          </label>
          <input
            type="text"
            id="town"
            name="town"
            required
            onChange={(e) => handleChange(e)}
            value={authenticationInfos.customer.town}
          />
        </form>
      </div>
    </>
  );
};

export default MyAccount;
