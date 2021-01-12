import React, { useContext, useState } from "react";
import AuthContext from "../../context/authContext";
import Field from "../../components/forms/Field";
import shopAPI from "../../services/shopAPI";
import { toast } from "react-toastify";
import localStorageAPI from "../../services/localStorageAPI";
import { FormattedMessage } from "react-intl";
import config from "../../services/config";

const MyShopAccount = (props) => {
  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  //We add a timer to not hit API at each user input.
  //This way there is at least WAIT_INTERVAL interval between each sending, or more if the user continues to input.
  const WAIT_INTERVAL = 1000;
  const [timer, setTimer] = useState(null);

  console.log(authenticationInfos);

  const handleChange = (event) => {
    setTimer(clearTimeout(timer));

    var { name, value } = event.target;

    if (name === "SIRET" || name === "vatNumber") {
      value = parseInt(value);
    }

    const contextCopy = { ...authenticationInfos };
    contextCopy.shop[name] = value;

    setAuthenticationInfos(contextCopy);

    setTimer(setTimeout(() => triggerAPISending(name, value), WAIT_INTERVAL));
  };

  const triggerAPISending = (name, value) => {
    const objectToSend = {
      shop: {
        id: process.env.REACT_APP_SHOP_ID,
        [name]: value,
      },
    };

    shopAPI
      .updateFields(objectToSend, process.env.REACT_APP_USER_ID)
      .then((data) => {
        const localStorage = localStorageAPI.getLocalStorageSession();
        localStorage.shop[name] = value;
        localStorage.client.shop[name] = value;
        localStorageAPI.saveLocalStorage("userInfos", localStorage);
      })
      .catch((data) =>
        toast.error(
          <FormattedMessage
            id="app.shop.myAccount.toast.failure"
            defaultMessage={`Register`}
          />
        )
      );
  };

  return (
    <>
      <div className="container my-account">
        <h1>
          <FormattedMessage
            id="app.shop.myAccount.title"
            defaultMessage={`Register`}
          />
        </h1>
        <form>
          <Field
            name="legalName"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.legalName"
                defaultMessage={`Legal Name`}
              />
            }
            value={authenticationInfos.shop.legalName}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.legalName"
                defaultMessage={`Business legal name...`}
              />
            }
            idNumber={Math.random()}
          />
          <Field
            name="email"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.mail"
                defaultMessage={`Email`}
              />
            }
            value={authenticationInfos.shop.email}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.mail"
                defaultMessage={`Your Professional Email`}
              />
            }
            type="mail"
            idNumber={Math.random()}
          />

          <Field
            name="tel"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.telephone"
                defaultMessage={`Phone Number`}
              />
            }
            value={authenticationInfos.shop.tel}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.telephone"
                defaultMessage={`Your Profesionnal Phone Number`}
              />
            }
            type="tel"
            idNumber={Math.random()}
          />
          <Field
            name="SIRET"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.RegistrationNumber"
                defaultMessage={`Company Registration Number`}
              />
            }
            value={authenticationInfos.shop.SIRET}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.RegistrationNumber"
                defaultMessage={`Company Registration Number...`}
              />
            }
            idNumber={Math.random()}
          />
          <Field
            name="vatNumber"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.vatNumber"
                defaultMessage={`VAT Number`}
              />
            }
            value={authenticationInfos.shop.vatNumber}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.vatNumber"
                defaultMessage={`VAT Number...`}
              />
            }
            idNumber={Math.random()}
          />

          <label htmlFor="adress">
            {
              <FormattedMessage
                id="app.shop.myAccount.label.adress"
                defaultMessage={`Adress`}
              />
            }
          </label>
          <textarea
            name="adress"
            id="adress"
            cols="22"
            rows="3"
            required
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.adress"
                defaultMessage={`Your Adress...`}
              />
            }
            onChange={(event) => handleChange(event)}
            value={authenticationInfos.shop.adress}
          ></textarea>

          <Field
            name="postalCode"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.postalCode"
                defaultMessage={`Postal Code`}
              />
            }
            value={authenticationInfos.shop.postalCode}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.postalCode"
                defaultMessage={`Postal Code...`}
              />
            }
            idNumber={Math.random()}
          />
          <Field
            name="town"
            label={
              <FormattedMessage
                id="app.shop.myAccount.label.town"
                defaultMessage={`Town`}
              />
            }
            value={authenticationInfos.shop.town}
            onChange={(event) => handleChange(event)}
            placeholder={
              <FormattedMessage
                id="app.shop.myAccount.placeholder.town"
                defaultMessage={`Your Town...`}
              />
            }
            idNumber={Math.random()}
          />

          <label htmlFor="legalClausesBuying">
            <FormattedMessage
              id="app.shop.myAccount.buyingClauses.title"
              defaultMessage={`Buying Clauses`}
            />
          </label>
          <textarea
            name="legalClausesBuying"
            id="legalClausesBuying"
            cols="22"
            rows="3"
            required
            onChange={(event) => handleChange(event, "TODOBRO")}
            value={authenticationInfos.shop.legalClausesBuying}
          ></textarea>
        </form>
      </div>
    </>
  );
};

export default MyShopAccount;
