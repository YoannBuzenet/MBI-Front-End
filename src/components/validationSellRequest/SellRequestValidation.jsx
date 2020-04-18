import React, { useContext, useEffect, useState } from "react";
import SellingBasketContext from "../../context/sellingBasket";
import AuthContext from "../../context/authContext";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import ValidSellRequestIsBasketEmpty from "./ValidSellRequestIsBasketEmpty";
import sellRequestAPI from "../../services/sellRequestAPI";
import authAPI from "../../services/authAPI";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";

const SellRequestValidation = ({ history, checkForDuplicates }) => {
  //Current Basket
  const { currentBasket, setCurrentBasket } = useContext(SellingBasketContext);

  //Current Authentication
  const { authenticationInfos, setAuthenticationInfos } = useContext(
    AuthContext
  );

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      //Save the new Sell Request into local storage
      //Building an object in the format of what is saved in Local Storage
      authAPI.updateUserInfosLocalStorage({
        token: window.localStorage.getItem("authToken"),
        user: {
          id: authenticationInfos.user.id,
          email: authenticationInfos.user.email,
          roles: authenticationInfos.user.roles,
        },
        client: {
          id: authenticationInfos.customer.id,
          prenom: authenticationInfos.customer.prenom,
          nom: authenticationInfos.customer.nom,
          tel: authenticationInfos.customer.tel,
          adress: authenticationInfos.customer.adress,
          postalCode: authenticationInfos.customer.postalCode,
          town: authenticationInfos.customer.town,
          SellRequests: authenticationInfos.customer.SellRequests,
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
      });
    }
  }, [authenticationInfos]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sellRequestData = {
      client: "/clients/" + authenticationInfos.customer.id,
      shop: "/shops/" + authenticationInfos.shop.id,
      amount: currentBasket.reduce((total, card) => {
        return total + card.price * card.quantity;
      }, 0),
      cardTotalQuantity: currentBasket.reduce((total, card) => {
        return total + card.quantity;
      }, 0),
      sellRequestCards: currentBasket.map((card) => {
        return {
          language: "/languages/" + card.lang,
          CardCondition: "/card_conditions/" + card.condition,
          cards: card["@id"],
          cardQuantity: card.quantity,
          price: card.price,
          isFoil: card.isFoil === "Yes" ? true : false,
          isSigned: card.isSigned === "Yes" ? true : false,
          isAltered: false, //False by default. Can only be edited in back-office by the shop.
        };
      }),
    };

    try {
      const sendSellRequest = await sellRequestAPI.send(sellRequestData);
      setIsLoaded(true);
      // console.log(sendSellRequest.data);

      //Adding the new sell request to the STATE information

      setAuthenticationInfos({
        ...authenticationInfos,
        customer: {
          ...authenticationInfos.customer,
          SellRequests: [
            ...authenticationInfos.customer.SellRequests,
            {
              id: sendSellRequest.data.id,
              dateEnvoi: sendSellRequest.data.dateEnvoi,
              dateRecu: sendSellRequest.data.dateRecu,
              dateProcessing: sendSellRequest.data.dateProcessing,
              dateApprovalPending: sendSellRequest.data.dateApprovalPending,
              dateValidated: sendSellRequest.data.dateValidated,
              dateCanceled: sendSellRequest.data.dateCanceled,
              amount: sendSellRequest.data.amount,
              cardTotalQuantity: sendSellRequest.data.cardTotalQuantity,
              DateSubmit: { date: sendSellRequest.data.DateSubmit },
            },
          ],
        },
      });

      setCurrentBasket([]);

      toast.success(
        <FormattedMessage
          id="app.sellRequestValidation.toast.success"
          defaultMessage={`Validate my Sell Request`}
        />
      );
      history.replace("/my_sell_requests");
    } catch (error) {
      console.log(error);
      toast.error(
        <FormattedMessage
          id="app.sellRequestValidation.toast.failure"
          defaultMessage={`The sell Request couldn't be posted. Please try again.`}
        />
      );
    }
  };

  return (
    <div className="sellRequest-validation-block">
      <h2>
        <FormattedMessage
          id="app.sellRequestValidation.validationCTA"
          defaultMessage={`Validate my Sell Request`}
        />
      </h2>
      <ValidSellRequestIsBasketEmpty
        handleSubmit={handleSubmit}
        checkForDuplicates={checkForDuplicates}
      />
    </div>
  );
};

export default SellRequestValidation;
