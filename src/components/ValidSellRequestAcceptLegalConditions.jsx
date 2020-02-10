import React from "react";

const ValidSellRequestAcceptLegalConditions = props => {
  return (
    <div className="isUserAuthenticated">
      <form action="" onSubmit={props.handleSubmit}>
        <input type="checkbox" required id="checkbox-compliance" />
        <label htmlFor="checkbox-compliance">
          J'accepte les conditions générales de ventes.
        </label>
        <button className="sellRequest-validation-button" type="submit">
          Valider mon rachat
        </button>
      </form>
    </div>
  );
};

export default ValidSellRequestAcceptLegalConditions;
