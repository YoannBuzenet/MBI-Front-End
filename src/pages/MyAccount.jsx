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

  const [timer, setTimer] = useState();

  const [accountInformation, setAccountInformation] = useState({
    firstName: authenticationInfos.customer.prenom,
    lastName: authenticationInfos.customer.nom,
    tel: authenticationInfos.customer.tel,
    mail: authenticationInfos.user.email,
    adress: authenticationInfos.customer.adress,
    postalCode: authenticationInfos.customer.postalCode,
    town: authenticationInfos.customer.town,
    idCustomer: authenticationInfos.customer.id,
  });

  const APIupdate = async () => {
    // console.log("update");

    const credentials = {
      client: {
        id: accountInformation.idCustomer,
        nom: accountInformation.lastName,
        prenom: accountInformation.firstName,
        adress: accountInformation.adress,
        postalCode: accountInformation.postalCode,
        town: accountInformation.town,
        tel: accountInformation.tel,
      },
      nickname: "",
    };

    try {
      const response = await userAPI.update(
        authenticationInfos.user.id,
        credentials
      );
      //UPDATE LE STATE

      setAccountInformation({
        firstName: response.data.client.prenom,
        lastName: response.data.client.nom,
        tel: response.data.client.tel,
        mail: response.data.email,
        adress: response.data.client.adress,
        postalCode: response.data.client.postalCode,
        town: response.data.client.town,
        idCustomer: response.data.client.id,
      });

      //UPDATE LES INFOS EN MEMOIRE VIVE
      setAuthenticationInfos({
        isAuthenticated: true,
        user: {
          id: response.data.id,
          email: response.data.email,
          roles: response.data.roles,
        },
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
        shop: { ...authenticationInfos.shop },
      });

      //Preparing data format to send, to copy what's stored in local storage
      const currentDataInLocalStorage = AuthAPI.userInfos();
      const newDataInLocalStorage = {
        token: currentDataInLocalStorage.token,
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
            id: authenticationInfos.shop.id,
            legalName: authenticationInfos.shop.legalName,
            SIRET: authenticationInfos.shop.SIRET,
            vatNumber: authenticationInfos.shop.vatNumber,
            tel: authenticationInfos.shop.tel,
            email: authenticationInfos.shop.email,
            adress: authenticationInfos.shop.adress,
            postalCode: authenticationInfos.shop.postalCode,
            town: authenticationInfos.shop.town,
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

    setAccountInformation({
      ...accountInformation,
      [name]: value,
    });

    setTimer(setTimeout(APIupdate, 2000));
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
          <label htmlFor="firstName">
            <FormattedMessage
              id="app.myAccountPage.FirstName"
              defaultMessage={`First Name`}
            />
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            required
            onChange={handleChange}
            value={accountInformation.firstName}
          />

          <label htmlFor="lastName">
            <FormattedMessage
              id="app.myAccountPage.LastName"
              defaultMessage={`Last Name`}
            />
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            required
            onChange={handleChange}
            value={accountInformation.lastName}
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
            onChange={handleChange}
            value={accountInformation.tel}
          />

          <label htmlFor="mail">
            <FormattedMessage
              id="app.myAccountPage.mail"
              defaultMessage={`Email`}
            />
          </label>
          <input
            type="mail"
            id="mail"
            name="mail"
            required
            onChange={handleChange}
            value={accountInformation.mail}
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
            onChange={handleChange}
            value={accountInformation.adress}
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
            onChange={handleChange}
            value={accountInformation.postalCode}
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
            onChange={handleChange}
            value={accountInformation.town}
          />
        </form>
      </div>
    </>
  );
};

export default MyAccount;
