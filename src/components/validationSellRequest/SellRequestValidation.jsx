import React, { useContext, useEffect, useState } from "react";
import SellingBasketContext from "../../context/sellingBasket";
import AuthContext from "../../context/authContext";
import canSubmitContext from "../../context/canSubmitSellRequestContext";
import ValidSellRequestIsBasketEmpty from "./ValidSellRequestIsBasketEmpty";
import sellRequestAPI from "../../services/sellRequestAPI";
import authAPI from "../../services/authAPI";

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
          roles: authenticationInfos.user.roles
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
            town: authenticationInfos.shop.town
          }
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
          town: authenticationInfos.shop.town
        }
      });
    }
  }, [authenticationInfos]);

  //Knowing if the Sell Request is OK to be submitted (no duplicate)
  const { errorList, setErrorList } = useContext(canSubmitContext);

  const handleSubmit = async event => {
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
      sellRequestCards: currentBasket.map(card => {
        return {
          language: "/languages/" + card.lang,
          CardCondition: "/card_conditions/" + card.condition,
          cards: card["@id"],
          cardQuantity: card.quantity,
          price: card.price,
          isFoil: card.isFoil === "Yes" ? true : false
        };
      })
    };

    try {
      const sendSellRequest = await sellRequestAPI.send(sellRequestData);
      setIsLoaded(true);
      // console.log(sendSellRequest.data);
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
              DateSubmit: sendSellRequest.data.DateSubmit
            }
          ]
        }
      });

      //TODO : NOTIF success
      history.replace("/my_sell_requests");
    } catch (error) {
      console.log(error);
      //TODO : NOTIF ECHEC
    }
  };

  return (
    <div className="sellRequest-validation-block">
      <h2>Valider mon rachat</h2>
      <ValidSellRequestIsBasketEmpty
        handleSubmit={handleSubmit}
        checkForDuplicates={checkForDuplicates}
      />
    </div>
  );
};

export default SellRequestValidation;
