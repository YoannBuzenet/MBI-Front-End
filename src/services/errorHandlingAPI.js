import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
import React from "react";

function check401Unauthorized(error) {
  if (error.response) {
    console.log(error.response);
    if (error.response.statusText === "Unauthorized") {
      toast.error(
        <FormattedMessage
          id="app.loginOutdated.toast.failure"
          defaultMessage={`You are not logged anymore. Please log again.`}
        />
      );
      return true;
    }
  }
  return false;
}

export default { check401Unauthorized };
