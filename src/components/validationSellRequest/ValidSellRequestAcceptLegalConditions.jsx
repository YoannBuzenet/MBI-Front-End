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
            defaultMessage={`I accept the {link}.`}
            values={{
              link: (
                <a href="/buyingClauses" target="_blank">
                  <FormattedMessage
                    id="app.sellRequestValidation.legalConditionsAccepting.link"
                    defaultMessage="shop buying clauses"
                  />
                </a>
              ),
            }}
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
