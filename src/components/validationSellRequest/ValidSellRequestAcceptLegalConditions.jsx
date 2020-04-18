import React from "react";
import { FormattedMessage } from "react-intl";

const ValidSellRequestAcceptLegalConditions = (props) => {
  return (
    <div className="isUserAuthenticated">
      <form action="" onSubmit={props.handleSubmit}>
        <input type="checkbox" required id="checkbox-compliance" />
        <label htmlFor="checkbox-compliance">
          <FormattedMessage
            id="app.sellRequestValidation.legalConditionsAccepting"
            defaultMessage={`I accept the shop buying clauses.`}
          />
        </label>
        <button className="sellRequest-validation-button" type="submit">
          <FormattedMessage
            id="app.sellRequestValidation.acceptCTA"
            defaultMessage={`Validate`}
          />
        </button>
      </form>
    </div>
  );
};

export default ValidSellRequestAcceptLegalConditions;
