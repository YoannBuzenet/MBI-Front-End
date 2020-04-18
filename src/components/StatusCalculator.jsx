import React from "react";
import { FormattedMessage } from "react-intl";

const StatusCalculator = ({ sellRequest }) => {
  // useEffect(() => console.log(sellRequest), [sellRequest]);

  var status = "";
  //Keep this one for submit prop
  if (sellRequest && sellRequest.DateSubmit) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.submitted"
        defaultMessage={`Submitted`}
      />
    );
  }

  if (sellRequest && sellRequest.dateEnvoi) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.sent"
        defaultMessage={`Sent`}
      />
    );
  }
  if (sellRequest && sellRequest.dateRecu) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.received"
        defaultMessage={`Received`}
      />
    );
  }
  if (sellRequest && sellRequest.dateProcessing) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.beingProcessed"
        defaultMessage={`Being Processed`}
      />
    );
  }
  if (sellRequest && sellRequest.dateApprovalPending) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.awaitingYourValidation"
        defaultMessage={`Awaiting your Validation`}
      />
    );
  }
  if (sellRequest && sellRequest.dateValidated) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.validated"
        defaultMessage={`Validated`}
      />
    );
  }
  if (sellRequest && sellRequest.dateCanceled) {
    status = (
      <FormattedMessage
        id="app.sellRequest.statusDefinition.cancelled"
        defaultMessage={`Cancelled`}
      />
    );
  }

  return <>{status}</>;
};

export default StatusCalculator;
